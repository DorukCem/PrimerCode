use anyhow::{Context, Result, anyhow};
use async_redis_session::RedisSessionStore;
use async_session::{Session, SessionStore};
use axum::{
    Json, RequestPartsExt,
    extract::{FromRef, FromRequestParts, OptionalFromRequestParts, Query, State},
    http::{HeaderMap, header::SET_COOKIE},
    response::{IntoResponse, Redirect, Response},
};
use axum_extra::{TypedHeader, headers, typed_header::TypedHeaderRejectionReason};
use diesel::{
    RunQueryDsl, SqliteConnection,
    dsl::insert_or_ignore_into,
    r2d2::{ConnectionManager, Pool},
};
use http::{header, request::Parts};
use oauth2::{
    AuthUrl, AuthorizationCode, ClientId, ClientSecret, CsrfToken, RedirectUrl, Scope,
    TokenResponse, TokenUrl, basic::BasicClient, reqwest::async_http_client,
};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::{convert::Infallible, env};

use crate::{db::DbPool, models::NewUser, AppError};

static COOKIE_NAME: &str = "SESSION";
static CSRF_TOKEN: &str = "csrf_token";

#[derive(Clone)]
pub struct AppState {
    pub store: RedisSessionStore,
    pub oauth_client: BasicClient,
    pub pool: Pool<ConnectionManager<SqliteConnection>>,
}

// * --- This part is basically to tell Axum how to get components of AppState from a AppState ref ---
impl FromRef<AppState> for RedisSessionStore {
    fn from_ref(state: &AppState) -> Self {
        state.store.clone()
    }
}

impl FromRef<AppState> for BasicClient {
    fn from_ref(state: &AppState) -> Self {
        state.oauth_client.clone()
    }
}

impl FromRef<AppState> for Pool<ConnectionManager<SqliteConnection>> {
    fn from_ref(state: &AppState) -> Self {
        state.pool.clone()
    }
}

// Create Redis session store
pub fn create_redis_store() -> Result<RedisSessionStore, AppError> {
    let redis_url =
        dotenvy::var("REDIS_URL").unwrap_or_else(|_| "redis://127.0.0.1:6379".to_string());

    let store = RedisSessionStore::new(redis_url)?;

    Ok(store)
}

// * --- ----

// * Configure oauth constants
/// Creates a struct to handle oauth operations with the required information
/// such as redirect URL, Client ID and Secret
pub fn oauth_client() -> Result<BasicClient, AppError> {
    let client_id = dotenvy::var("CLIENT_ID").context("Missing CLIENT_ID!")?;
    let client_secret = dotenvy::var("CLIENT_SECRET").context("Missing CLIENT_SECRET!")?;
    let redirect_url = dotenvy::var("REDIRECT_URL")
        .unwrap_or_else(|_| "http://127.0.0.1:3000/auth/authorized".to_string());

    let auth_url = env::var("AUTH_URL")
        .unwrap_or_else(|_| "https://accounts.google.com/o/oauth2/v2/auth".to_string());

    let token_url =
        env::var("TOKEN_URL").unwrap_or_else(|_| "https://oauth2.googleapis.com/token".to_string());

    Ok(BasicClient::new(
        ClientId::new(client_id),
        Some(ClientSecret::new(client_secret)),
        AuthUrl::new(auth_url).context("failed to create new authorization server URL")?,
        Some(TokenUrl::new(token_url).context("failed to create new token endpoint URL")?),
    )
    .set_redirect_uri(
        RedirectUrl::new(redirect_url).context("failed to create new redirection URL")?,
    ))
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AuthUser {
    pub id: String,
    pub email: String,
    pub name: String,
    pub picture: Option<String>,
}

// * Index route to test backend
pub async fn index(user: Option<AuthUser>) -> impl IntoResponse {
    match user {
        Some(u) => format!(
            "Hey {}! You're logged in!\nYou may now access `/protected`.\nLog out with `/logout`.",
            u.name
        ),
        None => "You're not logged in.\nVisit `/auth/google` to do so.".to_string(),
    }
}

/// Generates the Google OAuth login URL and CSRF token.
/// Saves the CSRF token in a session.
/// Stores the session and creates a cookie.
/// Sends a Set-Cookie header and redirects the user to Google’s login page.
pub async fn google_auth(
    State(client): State<BasicClient>, // We are the oauth client here not to be confused with the user
    State(store): State<RedisSessionStore>,
) -> Result<impl IntoResponse, AppError> {
    // auth_url: the Google OAuth2 login URL the user should be redirected to.
    // csrf_token: a unique token for preventing CSRF attacks.
    let (auth_url, csrf_token) = client
        .authorize_url(CsrfToken::new_random)
        .add_scope(Scope::new("openid email profile".to_string())) // Specifies what user info you want access to: openid, email and profile
        .url();

    // Create session to store csrf_token
    let mut session = Session::new();
    session
        .insert(CSRF_TOKEN, &csrf_token)
        .context("failed in inserting CSRF token into session")?;

    // Store the session in MemoryStore and retrieve the session cookie
    let cookie = store
        .store_session(session)
        .await
        .context("failed to store CSRF token session")?
        .context("unexpected error retrieving CSRF cookie value")?;

    // Attach the session cookie to the response header
    let cookie = format!("{COOKIE_NAME}={cookie}; SameSite=Lax; HttpOnly; Secure; Path=/");
    let mut headers = HeaderMap::new();
    headers.insert(
        SET_COOKIE,
        cookie.parse().context("failed to parse cookie")?,
    );

    Ok((headers, Redirect::to(auth_url.as_ref())))
}

// Valid user session required. If there is none, redirect to the auth page
pub async fn protected(user: AuthUser) -> impl IntoResponse {
    format!("Welcome to the protected area :)\nHere's your info:\n{user:?}")
}

/// Gets current user session using the cookie provided by the user; then, destroys the session
pub async fn logout(
    State(store): State<RedisSessionStore>,
    TypedHeader(cookies): TypedHeader<headers::Cookie>,
) -> Result<impl IntoResponse, AppError> {
    let cookie = cookies
        .get(COOKIE_NAME)
        .context("unexpected error getting cookie name")?;

    let session = match store
        .load_session(cookie.to_string())
        .await
        .context("failed to load session")?
    {
        Some(s) => s,
        // No session active, just redirect
        None => return Ok(Redirect::to("/")),
    };

    store
        .destroy_session(session)
        .await
        .context("failed to destroy session")?;

    Ok(Redirect::to("/"))
}

/// AuthRequest is a struct representing the query parameters sent by Google to your OAuth2 callback route
#[derive(Debug, Deserialize)]
#[allow(dead_code)]
pub struct AuthRequest {
    code: String, // the temporary authorization code that your server will exchange for an access token.
    state: String, // the CSRF token your app originally sent to Google during the authorize_url() call.
}

// * OAuth state (CSRF token) is meant to be single-use. Once validated, it must not be reused again.
/// Validates csrf token and removes the csrf session from MemoryStore since its not needed after this point
async fn csrf_token_validation_workflow(
    auth_request: &AuthRequest,
    cookies: &headers::Cookie,
    store: &RedisSessionStore,
) -> Result<(), AppError> {
    // Extract the cookie from the request
    let cookie = cookies
        .get(COOKIE_NAME)
        .context("unexpected error getting cookie name")?
        .to_string();

    // Load the session
    let session = match store
        .load_session(cookie)
        .await
        .context("failed to load session")?
    {
        Some(session) => session,
        None => return Err(anyhow!("Session not found").into()),
    };

    // Extract the CSRF token from the session
    let stored_csrf_token = session
        .get::<CsrfToken>(CSRF_TOKEN)
        .context("CSRF token not found in session")?
        .to_owned();

    // Cleanup the CSRF token session
    store
        .destroy_session(session)
        .await
        .context("Failed to destroy old session")?;

    // Validate CSRF token is the same as the one in the auth request
    if *stored_csrf_token.secret() != auth_request.state {
        return Err(anyhow!("CSRF token mismatch").into());
    }

    Ok(())
}

// * This route should only be called by Google, as a redirect after user login.
// * Google redirects back to your app with ?code=...&state=....
// * Your route receives and validates the state (CSRF token).
// * You exchange the code for an access token.
// * You use the access token to fetch user info from Google.
// * You create a new session containing the user data.
// * You set a cookie with the session ID and redirect the user to the frontend.
pub async fn login_authorized(
    Query(query): Query<AuthRequest>,
    State(pool): State<DbPool>,
    State(store): State<RedisSessionStore>,
    State(oauth_client): State<BasicClient>,
    TypedHeader(cookies): TypedHeader<headers::Cookie>,
) -> Result<impl IntoResponse, AppError> {
    csrf_token_validation_workflow(&query, &cookies, &store).await?;

    // Get an auth token
    let token = oauth_client
        .exchange_code(AuthorizationCode::new(query.code.clone()))
        .request_async(async_http_client)
        .await
        .context("failed in sending request request to authorization server")?;

    // Fetch user data from Google
    let client = reqwest::Client::new();
    let user_data: AuthUser = client
        .get("https://www.googleapis.com/oauth2/v2/userinfo")
        .bearer_auth(token.access_token().secret())
        .send()
        .await
        .context("failed in sending request to target Url")?
        .json::<AuthUser>()
        .await
        .context("failed to deserialize response as JSON")?;

    insert_user_to_db(&user_data, &pool)?;

    // Create a new session filled with user data
    let mut session = Session::new();
    session
        .insert("user", &user_data)
        .context("failed in inserting serialized value into session")?;

    // Store session and get corresponding cookie
    let cookie = store
        .store_session(session)
        .await
        .context("failed to store session")?
        .context("unexpected error retrieving cookie value")?;

    let cookie = format!("{COOKIE_NAME}={cookie}; SameSite=Lax; HttpOnly; Secure; Path=/");
    // Set cookie
    let mut headers = HeaderMap::new();
    headers.insert(
        SET_COOKIE,
        cookie.parse().context("failed to parse cookie")?,
    );

    let redirect_path = cookies
        .get("redirect_after_login")
        .map(|val| {
            percent_encoding::percent_decode_str(val)
                .decode_utf8()
                .map(|s| s.to_string())
                .unwrap_or_else(|_| "/".to_string()) // fallback if decoding fails
        })
        .unwrap_or_else(|| "/".to_string());

    let frontend_base_url = std::env::var("FRONTEND_REDIRECT").unwrap();
    let full_redirect = format!("{}{}", frontend_base_url, redirect_path);

    Ok((headers, Redirect::to(&full_redirect)))
}

fn insert_user_to_db(
    user_data: &AuthUser,
    pool: &Pool<ConnectionManager<SqliteConnection>>,
) -> Result<impl IntoResponse, AppError> {
    use crate::schema::users::dsl::*;
    let mut conn = pool.get().context("failed to get DB connection")?;
    let new_user = NewUser {
        id: &user_data.id,
        user_name: &user_data.name,
        email: &user_data.email,
    };

    insert_or_ignore_into(users)
        .values(new_user)
        .execute(&mut conn)
        .context("failed to insert new user")?;

    Ok(())
}

// *  We can say user: Option<User> here to get the user thanks to the From request parts trait we have implemented for User
// Add this new route to check current user
pub async fn get_current_user(user: Option<AuthUser>) -> impl IntoResponse {
    match user {
        Some(user) => Json(json!({
            "authenticated": true,
            "user": user
        }))
        .into_response(),
        None => Json(json!({
            "authenticated": false,
            "user": null
        }))
        .into_response(),
    }
}

// Add this route to check auth status
pub async fn auth_status(user: Option<AuthUser>) -> impl IntoResponse {
    Json(json!({
        "authenticated": user.is_some()
    }))
}

pub struct AuthRedirect;

impl IntoResponse for AuthRedirect {
    fn into_response(self) -> Response {
        Redirect::temporary("/auth/google").into_response()
    }
}

// * In Axum, you can implement the FromRequestParts or OptionalFromRequestParts traits to extract custom types (like User) from a request.

/// This is for routes where authentication is required.
impl<S> FromRequestParts<S> for AuthUser
where
    RedisSessionStore: FromRef<S>,
    S: Send + Sync,
{
    // If anything goes wrong or no session is found, redirect to the auth page
    type Rejection = AuthRedirect;

    // Attempts to extract the session cookie from the request.
    // Loads the session from MemoryStore.
    // Extracts the User struct from the session.
    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        let store = RedisSessionStore::from_ref(state);

        let cookies = parts
            .extract::<TypedHeader<headers::Cookie>>()
            .await
            .map_err(|e| match *e.name() {
                header::COOKIE => match e.reason() {
                    TypedHeaderRejectionReason::Missing => AuthRedirect,
                    _ => panic!("unexpected error getting Cookie header(s): {e}"),
                },
                _ => panic!("unexpected error getting cookies: {e}"),
            })?;
        let session_cookie = cookies.get(COOKIE_NAME).ok_or(AuthRedirect)?;

        let session = store
            .load_session(session_cookie.to_string())
            .await
            .unwrap()
            .ok_or(AuthRedirect)?;

        let user = session.get::<AuthUser>("user").ok_or(AuthRedirect)?;

        Ok(user)
    }
}

/// This is for routes where authentication is optional
impl<S> OptionalFromRequestParts<S> for AuthUser
where
    RedisSessionStore: FromRef<S>,
    S: Send + Sync,
{
    type Rejection = Infallible;

    async fn from_request_parts(
        parts: &mut Parts,
        state: &S,
    ) -> Result<Option<Self>, Self::Rejection> {
        match <AuthUser as FromRequestParts<S>>::from_request_parts(parts, state).await {
            Ok(res) => Ok(Some(res)),
            Err(AuthRedirect) => Ok(None),
        }
    }
}
