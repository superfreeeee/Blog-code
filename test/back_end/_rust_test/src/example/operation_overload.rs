use std::ops;

#[derive(Copy, Clone)]
struct Foo;

#[derive(Copy, Clone)]
struct Bar;

#[derive(Debug)]
struct FooBar;

#[derive(Debug)]
struct BarFoo;

impl ops::Add<Bar> for Foo {
    type Output = FooBar;

    fn add(self, _rhs: Bar) -> Self::Output {
        println!("> ops call: Foo + Bar");

        FooBar
    }
}

impl ops::Add<Foo> for Bar {
    type Output = BarFoo;

    fn add(self, _rhs: Foo) -> Self::Output {
        println!("> ops call: Bar + Foo");

        BarFoo
    }
}

#[allow(dead_code)]
pub fn test() {
    let foo = Foo;
    let bar = Bar;

    let foo_bar = foo + bar;
    let bar_foo = bar + foo;

    println!("foo + bar = {:?}", foo_bar);
    println!("bar + foo = {:?}", bar_foo);
}