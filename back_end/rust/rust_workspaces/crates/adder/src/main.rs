use {add_one, add_two};

fn main() {
    let num = 10;
    println!("Hello, world! {} + 1 = {}", num, add_one::add_one(num));
    for _ in 0..5 {
        println!(
            "Hello, world! {} +? 1 = {}",
            num,
            add_one::maybe_add_one(num)
        );
    }

    println!("Hello, world! {} + 2 = {}", num, add_two::add_two(num));
}
