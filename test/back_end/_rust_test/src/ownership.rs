pub fn test_ownership() {
    println!("----- test_ownership -----");

    // pass ownership
    println!("<<< pass ownership >>>");
    let s1 = String::from("superfree");
    let s2 = s1;
    println!("s = {}", s2);

    // clone data
    println!("<<< clone data >>>");
    let s1 = String::from("superfree");
    let s2 = s1.clone();
    println!("s1 = {}", s1);
    println!("s2 = {}", s2);

    // pass as fn parameter
    println!("<<< fn parameter >>>");
    let n = 123;
    let s = String::from("123");
    not_take_ownership(n);
    do_take_ownership(s);
    println!("n = {}", n);

    // return from fn
    println!("<<< fn return >>>");
    let s = create_and_return_ownership();
    let s = get_and_return_ownership(s);
    println!("after ownership return: s = {}", s);
}

fn not_take_ownership(n: i32) {
    println!("n = {}", n);
}

fn do_take_ownership(s: String) {
    println!("s = {}", s);
}

fn create_and_return_ownership() -> String {
    String::from("greeting")
}

fn get_and_return_ownership(s: String) -> String {
    println!("s = {}, and return", s);
    s
}