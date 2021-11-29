use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

fn hello(name: &str) {
    println!("Hello {}", name);
}

pub fn test() {
    println!(">>>>> test own_smart_pointer");

    let name = MyBox::new(String::from("superfree"));
    hello(&name);

    println!();
}