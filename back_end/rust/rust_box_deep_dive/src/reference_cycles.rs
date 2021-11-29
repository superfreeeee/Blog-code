use std::cell::RefCell;
use std::rc::Rc;
use crate::reference_cycles::List::{Cons, Nil};

#[derive(Debug)]
enum List {
    Cons(i32, RefCell<Rc<List>>),
    Nil,
}

impl List {
    fn tail(&self) -> Option<&RefCell<Rc<List>>> {
        match self {
            Cons(_, item) => Some(item),
            Nil => None
        }
    }
}

impl Drop for List {
    fn drop(&mut self) {
        println!("drop {:?}", self);
    }
}

pub fn test() {
    println!(">>>>> test reference_cycles");

    let a = Rc::new(Cons(5, RefCell::new(Rc::new(Nil))));
    println!("reference a = {:?}", a);
    println!("reference a count = {}", Rc::strong_count(&a));
    println!("reference a next = {:?}", a.tail());

    let b = Rc::new(Cons(10, RefCell::new(Rc::clone(&a))));
    println!("reference b = {:?}", b);
    println!("reference b count = {}", Rc::strong_count(&b));
    println!("reference b next = {:?}", b.tail());

    if let Some(link) = a.tail() {
        *link.borrow_mut() = Rc::clone(&b);
    }

    println!("reference a count = {}", Rc::strong_count(&a));
    println!("reference b count = {}", Rc::strong_count(&b));

    println!();
}