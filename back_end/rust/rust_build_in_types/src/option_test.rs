use std::panic;

fn div(a: i32, b: i32) -> Option<f64> {
    if b == 0 {
        None
    } else {
        Some(a as f64 / b as f64)
    }
}

// Option 作为返回值
fn test_return() {
    println!(">>>>> test Option as return");

    println!("1 / 1 = {:?}", div(1, 1));
    println!("1 / 0 = {:?}", div(1, 0));
    println!("0 / 1 = {:?}", div(0, 1));
    println!("1 / 2 = {:?}", div(1, 2));

    println!();
}

fn match_option(option: Option<i32>) {
    match option {
        Some(val) => println!("match val = {}", val),
        None => println!("match Option::None")
    }
}

fn match_assign_option(option: Option<i32>) -> i32 {
    if let Some(val) = option {
        val
    } else {
        0
    }
}

// Option 透过 match 解构
fn test_match() {
    println!(">>>>> test match Option");

    match_option(None);
    match_option(Some(4));

    println!("val = {}", match_assign_option(None));
    println!("val = {}", match_assign_option(Some(5)));

    println!();
}

fn unwrap_option(option: Option<i32>) -> i32 {
    option.unwrap()
}

fn unwrap_print_option(f: fn() -> i32) {
    if let Ok(val) = panic::catch_unwind(f) {
        println!("val = {}", val);
    }
}

// Option 透过 unwrap 解构
fn test_unwrap() {
    println!(">>>>> test Option.unwrap");

    unwrap_print_option(|| unwrap_option(None));
    unwrap_print_option(|| unwrap_option(Some(6)));

    println!();
}

fn create_option(x: i32) -> Option<i32> {
    if x >= 0 {
        Some(x)
    } else {
        None
    }
}

fn check_positive_integer(x: i32) {
    if let None = (|| {
        let val = create_option(x)?;

        println!("get positive integer: {}", val);

        Some(0)
    })() {
        println!("{} is not positive integer", x);
    }
}

// 使用 ? 语法解构
fn test_question_syntax() {
    println!(">>>>> test Option?");

    check_positive_integer(100);
    check_positive_integer(0);
    check_positive_integer(-100);

    println!();
}

pub fn test() {
    println!("========== Option ==========");
    test_return();
    test_match();
    test_unwrap();
    test_question_syntax();
}