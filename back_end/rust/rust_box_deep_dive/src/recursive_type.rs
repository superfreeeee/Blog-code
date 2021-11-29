use crate::recursive_type::List::{Cons, Nil};

#[derive(Debug)]
enum List {
    Cons(i32, Box<List>),
    Nil,
}

#[derive(Debug)]
struct Node {
    val: i32,
    next: Box<Option<Node>>,
}

pub fn test() {
    println!(">>>>> test recursive_type");

    let list = Cons(3, Box::new(Cons(2, Box::new(Nil))));
    println!("list = {:?}", list);

    let mut node = Node {
        val: 1,
        next: Box::new(Some(Node {
            val: 2,
            next: Box::new(None),
        })),
    };
    println!("node = {:?}", node);
    *node.next = None;
    println!("node = {:?}", node);

    println!();
}