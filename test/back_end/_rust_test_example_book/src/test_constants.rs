static A: u32 = 123;
const GREETING: &str = "Hello world";

#[test]
fn test_global_var() {
    println!("{}", GREETING);
    println!("10 + {} = {}", A, 10 + A)
}