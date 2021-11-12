use std::fmt::Debug;

pub fn test_object_oriented() {
    println!("----- test_object_oriented -----");

    // class
    println!("<<< class >>>");
    let a = ClassA::new(2);
    a.print();
    let e = ClassE::EA { id: 123 };
    e.print();
    let e = ClassE::EB(123);
    e.print();

    // interface (using trait)
    println!("<<< interface (using trait) >>>");
    a.run();
    e.run();
}

trait Runnable {
    fn run(&self) where Self: Debug {
        println!("{:?}.run", self);
    }
}

impl Runnable for ClassA {}

impl Runnable for ClassE {}

#[derive(Debug)]
struct ClassA {
    id: u32
}

impl ClassA {
    fn new(id: u32) -> ClassA {
        ClassA { id }
    }

    fn print(&self) {
        println!("{:?}", self);
    }
}

#[derive(Debug)]
enum ClassE {
    EA { id: i32 },
    EB(i32),
}

impl ClassE {
    fn print(&self) {
        println!("{:?}", self);
    }
}