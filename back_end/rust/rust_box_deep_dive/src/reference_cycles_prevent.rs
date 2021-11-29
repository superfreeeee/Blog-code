use std::cell::RefCell;
use std::rc::{Rc, Weak};

#[derive(Debug)]
struct Node {
    val: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

pub fn test() {
    println!(">>>>> test reference_cycles_prevent");

    let leaf = Rc::new(Node {
        val: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!("! create leaf");
    println!("leaf = {:?}", leaf);
    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
    println!("leaf strong = {}, weak = {}", Rc::strong_count(&leaf), Rc::weak_count(&leaf));
    {
        let branch = Rc::new(Node {
            val: 5,
            parent: RefCell::new(Weak::new()),
            children: RefCell::new(vec![Rc::clone(&leaf)]),
        });

        println!("! create branch");
        println!("branch = {:?}", branch);
        println!("branch parent = {:?}", branch.parent.borrow().upgrade());
        println!("leaf strong = {}, weak = {}", Rc::strong_count(&leaf), Rc::weak_count(&leaf));
        println!("branch strong = {}, weak = {}", Rc::strong_count(&branch), Rc::weak_count(&branch));

        *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

        println!("! ref branch");
        println!("leaf = {:?}", leaf);
        println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
        println!("leaf strong = {}, weak = {}", Rc::strong_count(&leaf), Rc::weak_count(&leaf));
        println!("branch strong = {}, weak = {}", Rc::strong_count(&branch), Rc::weak_count(&branch));
    }
    println!("! drop branch");
    println!("leaf = {:?}", leaf);
    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
    println!("leaf strong = {}, weak = {}", Rc::strong_count(&leaf), Rc::weak_count(&leaf));

    println!();
}