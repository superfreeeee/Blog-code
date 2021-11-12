#[allow(unused_imports)]
use super::destructor::*;

#[allow(dead_code)]
pub fn test() {
    /* primitive test */
    let x = 100u32;
    println!("x = {}", x);
    let y = x;
    println!("y = {}", y);
    println!("x still available: x = {}", x);

    /* box test */
    let _box = ToDrop { val: 200 };
    println!("_box = {:?}", _box);

    // println!("_box unavailable now: _box = {:?}", _box);

    {
        println!(">>>>> in block <<<<<");
        let item = ToDrop { val: 300 };
        let _box = Box::new(item);
        println!("_box = {:?}", _box);

        let item = *_box;
        println!("item = {:?}", item);
    }
    println!(">>>>> in block <<<<<");

    let _box2 = _box;
    println!("_box2 = {:?}", _box2);
}