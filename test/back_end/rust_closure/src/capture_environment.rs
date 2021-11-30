fn once<T>(f: T) -> Box<dyn Fn() -> u32> where T: FnOnce() -> u32 {
    let val = f();
    Box::new(move || val)
}

fn counter() -> Box<dyn FnMut(bool) -> u32> {
    let mut val = 0;
    Box::new(move |incr| {
        if incr {
            val += 1;
        }
        val
    })
}

fn capture_var(x: u32) -> Box<dyn Fn(u32) -> bool> {
    Box::new(move |y: u32| y == x)
}

pub fn test() {
    println!(">>>>> capture_environment");

    println!("! Fn test");
    let equal_one = capture_var(1);
    println!("equal_one(3) = {}", (*equal_one)(3));
    println!("equal_one(2) = {}", (*equal_one)(2));
    println!("equal_one(1) = {}", (*equal_one)(1));

    println!("! FnMut test");
    let mut increment = counter();
    println!("increment() = {}", (*increment)(true));
    println!("increment() = {}", (*increment)(true));
    println!("increment() = {}", (*increment)(false));

    println!("! FnOnce test");
    let gettter = once(|| {
        3
    });
    println!("get = {}", (*gettter)());

    println!();
}