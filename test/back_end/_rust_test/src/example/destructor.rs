#[derive(Debug)]
pub struct ToDrop {
    pub val: i32,
}

impl Drop for ToDrop {
    fn drop(&mut self) {
        println!("drop: self = {:?}", self);
    }
}

#[allow(dead_code)]
pub fn test() {
    let x = ToDrop { val: 123 };
    println!("test end");
    println!("x = {:?}", x);
}