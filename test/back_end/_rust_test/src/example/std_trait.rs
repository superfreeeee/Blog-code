// Operation Overload Trait
use std::ops;

#[derive(Debug)]
struct Foo;

#[derive(Debug)]
struct Bar;

#[derive(Debug)]
struct FooBar;

impl ops::Add<Bar> for Foo {
    type Output = FooBar;

    fn add(self, _rhs: Bar) -> Self::Output {
        println!("> Foo({:?}) + Bar({:?})", self, _rhs);

        FooBar
    }
}

// Drop Trait
#[derive(Debug)]
struct Droppable {
    name: &'static str
}

impl Drop for Droppable {
    fn drop(&mut self) {
        println!("> Dropping {}", self.name);
    }
}

// Iterator Trait
struct Fibonacci {
    curr: u32,
    next: u32,
}

impl Iterator for Fibonacci {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        let val = self.curr + self.next;

        self.curr = self.next;
        self.next = val;

        Some(val)
    }
}

fn fibonacci() -> impl Iterator<Item=u32> {
    Fibonacci { curr: 0, next: 1 }
}

// Clone Trait
#[derive(Debug, Copy, Clone)]
struct Unit;

#[derive(Debug, Clone)]
struct Pair(Box<u32>, Box<u32>);

// Super Trait
trait A {
    fn a(&self) -> u32;
}

trait B: A {
    fn b(&self) -> u32;
}

trait C {
    fn c(&self, a: u32, b: u32) -> u32;
}

trait D: B + C {
    fn d(&self) {
        let a = self.a();
        let b = self.b();
        let c = self.c(a, b);
        println!("a = {}, b = {}, c = {}", a, b, c);
    }
}

struct O {
    _a: u32,
    _b: u32,
}

impl A for O {
    fn a(&self) -> u32 {
        self._a
    }
}

impl B for O {
    fn b(&self) -> u32 {
        self._b
    }
}

impl C for O {
    fn c(&self, a: u32, b: u32) -> u32 {
        a + b
    }
}

impl D for O {}

#[allow(dead_code)]
pub fn test() {
    // test Add trait
    println!("foo + bar = {:?}", Foo + Bar);

    // test Drop Trait
    {
        println!("create Droppable = {:?}", Droppable { name: "a" });

        let b = Droppable { name: "b" };
        println!("create Droppable = {:?}", b);

        println!("after create a, b");
    }


    // test Iterator Trait
    {
        let mut fib = fibonacci();
        for i in 1..10 {
            println!("fib({}) = {}", i, fib.next().unwrap());
        }
    }
    for i in fibonacci().take(4) {
        println!("i = {}", i);
    }
    for j in fibonacci().skip(4).take(4) {
        println!("j = {}", j);
    }
    for k in fibonacci() {
        if k > 1000 {
            break;
        }
        println!("k = {}", k);
    }

    // test clone trait
    {
        let unit = Unit;
        let unit2 = unit;
        println!("unit 1 = {:?}", unit);
        println!("unit 2 = {:?}", unit2);

        let pair = Pair(Box::new(100u32), Box::new(200u32));
        println!("pair 1 = {:?}", pair);
        let pair2 = pair;
        // println!("pair 1 = {:?}", pair);
        println!("pair 2 = {:?}", pair2);

        let pair3 = pair2.clone();
        drop(pair2);
        // println!("pair 2 = {:?}", pair2);
        println!("pair 3 = {:?}", pair3);
    }

    // test Super Trait
    let o = O { _a: 100, _b: 200 };
    println!("o.a() = {}", o.a());
    println!("o.b() = {}", o.b());
    o.d();
}