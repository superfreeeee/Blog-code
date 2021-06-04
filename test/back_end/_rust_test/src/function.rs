pub fn test_function() {
    println!("----- test_function -----");
    show();
    println!("add({}, {}) = {}", 1, 2, add(1, 2));
    // function expression
    let y = {
        let x = 123;
        x * 2
    };
    println!("y = {}", y);
    fn inner_add(x: i32, y: i32) -> i32 { x + y }
    println!("inner_add({}, {}) = {}", 1, 2, inner_add(1, 2));

}

// no param
fn show() {
    println!("show(): show something");
}

// primitive param
fn add(x: i32, y: i32) -> i32 {
    return x + y
}