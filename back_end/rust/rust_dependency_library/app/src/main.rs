extern crate rand;
extern crate lib;

fn main() {
    println!("Hello, world!");
    let x: i32 = rand::random();
    println!("random x = {}", x);
    lib::test_fn();
    println!("1 + 2 = {}", lib::add(1, 2));
}
