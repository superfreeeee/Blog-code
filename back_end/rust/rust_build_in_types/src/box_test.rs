use std::mem::size_of_val;

#[derive(Debug, Copy, Clone)]
struct Point {
    x: i32,
    y: i32,
}

#[derive(Debug)]
struct Rectangle {
    top_left: Point,
    bottom_right: Point,
}

fn test_alloc() {
    println!(">>>>> test allocation");

    // Point on stack
    let point = Point { x: 0, y: 0 };
    println!("point = {:?}", point);
    println!("sizeof(point) = {}", size_of_val(&point));

    // Rectangle on stack
    let point_b = Point { x: 10, y: 10 };
    let rect = Rectangle { top_left: point, bottom_right: point_b };
    println!("rect = {:?}", rect);
    println!("sizeof(rect) = {}", size_of_val(&rect));

    // Point on heap
    let box_point = Box::from(point);
    println!("box_point = {:?}", box_point);
    println!("sizeof(box_point) = {}", size_of_val(&box_point));

    // Rectangle on heap
    let box_rect = Box::from(rect);
    println!("box_rect = {:?}", box_rect);
    println!("sizeof(box_rect) = {}", size_of_val(&box_rect));

    println!();
}

fn test_mut() {
    println!(">>>>> test mutability");

    // init
    let mut point = Point { x: 0, y: 0 };
    let mut box_point = Box::from(point);
    println!("point = {:?}", point);
    println!("box_point = {:?}", box_point);

    // assign 'mut Box<Point>'
    box_point.x = 1;
    box_point.y = 1;
    println!("point = {:?}", point);
    println!("box_point = {:?}", box_point);

    // rebind 'Box<Point>'
    *box_point = Point { x: 2, y: 2 };
    println!("point = {:?}", point);
    println!("box_point = {:?}", box_point);

    // assign 'Box<&mut Point>'
    let box_point_ref = Box::from(&mut point);
    box_point_ref.x = 3;
    box_point_ref.y = 3;
    println!("box_point_ref = {:?}", box_point_ref);
    println!("point = {:?}", point);

    println!();
}

pub fn test() {
    println!("========== Box ==========");
    test_alloc();
    test_mut();
}