// build.rs
fn main() {
    println!("cargo:rustc-env=TS_RS_EXPORT_DIR=./client/src/types"); // Sets env variable
}