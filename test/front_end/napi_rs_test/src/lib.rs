#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn sum(a: i32, b: i32) -> i32 {
    let c = a + b;
    c
}

#[test]
fn test() {
    sum(1, 2);
}
