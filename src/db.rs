use diesel::r2d2::{self, ConnectionManager};
use diesel::sqlite::SqliteConnection;

pub type DbPool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

pub fn establish_pool() -> DbPool {
    let database_url = dotenvy::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<SqliteConnection>::new(database_url);
    r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool")
}