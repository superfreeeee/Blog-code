fn eat(_box: Box<i32>) {
    println!("eat box = {}", _box);
}

fn borrow(i: &i32) {
    println!("borrow i = {}", i);
}

#[allow(dead_code)]
pub fn test() {
    let a = Box::new(100);
    let b = 200;
    borrow(&a);
    borrow(&b);

    {
        let _ref = &a;

        // borrow(_ref);

        // eat(a);

        borrow(_ref);
    }

    eat(a);
}