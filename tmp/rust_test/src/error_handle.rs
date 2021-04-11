use std::io;
use std::fs::File;
use std::io::Read;

pub fn test_result() {
    println!("----- test_result -----");

    // invoke an unrecoverable exception
    println!("<<< panic! >>>");
    // panic!("error occurred");
    println!("other msg");

    // Result using match
    println!("<<< Result using match >>>");
    let f = File::open("../hello.txt");
    match f {
        Result::Ok(file) => {
            println!("Open file success: {:?}", file)
        }
        Err(err) => {
            println!("Open file fail: {:?}", err);
        }
    }

    // Result using if let
    println!("<<< Result using if let >>>");
    let f = File::open("../hello.txt");
    if let Ok(file) = f {
        println!("Open file success: {:?}", file)
    } else {
        println!("Open file fail");
    }

    // error correction
    println!("<<< error correction >>>");
    // let f = File::open("hello.txt").unwrap(); // using unwrap
    // let f = File::open("hello.txt").expect("open fail"); // using expect

    // return Result
    println!("<<< return Result >>>");
    handle_g(g(1));
    handle_g(g(-1));

    // passing Result
    println!("<<< passing Result >>>");
    handle_g(passing_g(1));
    handle_g(passing_g(-1));
    handle_g(simple_passing_g(1));
    handle_g(simple_passing_g(-1));

    // Err kind
    println!("<<< Err kind >>>");
    handle_text_from_file();
}

fn handle_text_from_file() {
    let str_file = read_text_from_file("hello.txt");
    match str_file {
        Ok(s) => println!("{}", s),
        Err(e) => {
            match e.kind() {
                io::ErrorKind::NotFound => {
                    println!("No such file")
                }
                _ => {
                    println!("Other io Error")
                }
            }
        }
    }
}

fn read_text_from_file(path: &str) -> Result<String, io::Error> {
    let mut f = File::open(path)?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}

fn g(i: i32) -> Result<i32, i32> {
    if i >= 0 { Ok(i) } else { Err(i) }
}

fn handle_g(res: Result<i32, i32>) {
    match res {
        Ok(val) => println!("Ok! With val = {}", val),
        Err(val) => println!("Err. With val = {}", val)
    }
}

fn passing_g(i: i32) -> Result<i32, i32> {
    let res = g(i);
    match res {
        Ok(v) => Ok(v),
        Err(v) => Err(v)
    }
}

fn simple_passing_g(i: i32) -> Result<i32, i32> {
    let res = g(i)?;
    Ok(res)
}