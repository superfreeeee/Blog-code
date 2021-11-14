use std::fmt::Debug;
use std::mem::size_of_val;

fn drop_resource<T: Debug>(item: &mut T) {
    println!("=== [release resources] {:?} ,free: {} bytes", item, size_of_val(item));
}

#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

impl Drop for Point {
    fn drop(&mut self) {
        drop_resource(self);
    }
}

#[derive(Debug)]
struct Rectangle {
    top_left: Point,
    bottom_right: Point,
}

impl Drop for Rectangle {
    fn drop(&mut self) {
        drop_resource(self);
    }
}

fn main() {
    let point = Point { x: -1, y: -1 };
    println!("point = {:?}", point);
    drop(point);

    let point = Point { x: 0, y: 0 };
    println!("point = {:?}", point);

    let rect = Rectangle {
        top_left: Point { x: 1, y: 1 },
        bottom_right: Point { x: 2, y: 2 },
    };
    println!("rect = {:?}", rect);

    let box_rect = Box::new(Rectangle {
        top_left: Point { x: 3, y: 3 },
        bottom_right: Point { x: 4, y: 4 },
    });
    println!("box_rect = {:?}", box_rect);
}
