use std::rc::Rc;
use crate::reference_count::List::{Cons, Nil};

#[derive(Debug)]
enum List {
    Cons(i32, Rc<List>),
    Nil,
}

pub fn test() {
    println!(">>>>> test reference_count");

    let a = Rc::new(Cons(3, Rc::new(Cons(5, Rc::new(Nil)))));
    println!("a = {:?}", a);
    println!("a strong_count = {}", Rc::strong_count(&a));

    {
        let b = Rc::new(Cons(1, Rc::clone(&a)));
        println!("b = {:?}", b);
        println!("a strong_count = {}", Rc::strong_count(&a));
        {
            let c = Rc::new(Cons(2, Rc::clone(&a)));
            println!("c = {:?}", c);
            println!("a strong_count = {}", Rc::strong_count(&a));
        }
        println!("! drop c");
        println!("a strong_count = {}", Rc::strong_count(&a));
    }

    println!();
}