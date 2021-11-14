extern crate reqwest;

use futures::executor::block_on;


async fn request() -> Result<u32, reqwest::Error> {
    let body = reqwest::get("https://www.rust-lang.org")
        .await?
        .text()
        .await?;

    println!("body: {:?}", body);

    Ok(0)
}

#[allow(dead_code)]
pub fn main() {
    match block_on(request()) {
        Ok(code) => {
            println!("request succes with code: {}", code);
        }
        Err(err) => {
            println!("request fail: {}", err);
        }
    };
}