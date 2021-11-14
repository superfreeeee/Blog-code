use futures::executor::block_on;

#[derive(Debug)]
struct Song {
    val: u32,
}

async fn learn_song() -> Song {
    let song = Song { val: 1 };
    println!("learn a song: {:?}", song);
    song
}

async fn sing_song(song: Song) {
    println!("sing a song: {:?}", song);
}

async fn dance() {
    println!("dancing")
}

// block way program
fn blocked_progress() {
    let song = block_on(learn_song());
    block_on(sing_song(song));
    block_on(dance());
}

// async way program
async fn learn_and_sing() {
    let song = learn_song().await;
    sing_song(song).await;
}

async fn async_progress() {
    let f1 = learn_and_sing();
    let f2 = dance();

    futures::join!(f1, f2);
}

pub fn do_tasks() {
    blocked_progress();
    block_on(async_progress());
}