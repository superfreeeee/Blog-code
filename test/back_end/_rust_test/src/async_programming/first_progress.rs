use futures::executor::block_on;

async fn first_async_fn() {
    println!("Hello asynchronous rust")
}

#[allow(unused)]
pub fn first_progress() {
    let f = first_async_fn();
    block_on(f);
}