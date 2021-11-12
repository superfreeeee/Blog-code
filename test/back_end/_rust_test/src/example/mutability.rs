#[allow(dead_code)]
pub fn test() {
    let _box = Box::new(100u32);
    println!("box = {}", _box);

    // _box = 200;

    let mut _box = _box;

    *_box = 200;
    
    println!("box = {}", _box);
}