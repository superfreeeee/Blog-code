use std::mem::size_of_val;

#[derive(Debug)]
struct Point {
    x: u32,
    y: u32,
}

impl From<(u32, u32)> for Point {
    fn from((x, y): (u32, u32)) -> Self {
        Point {
            x,
            y,
        }
    }
}

#[derive(Debug)]
struct Rectangle {
    top_left: Point,
    bottom_right: Point,
}

impl From<(Point, Point)> for Rectangle {
    fn from((a, b): (Point, Point)) -> Self {
        Rectangle {
            top_left: a,
            bottom_right: b,
        }
    }
}

fn test_box_size() {
    // normal Point
    let point = Point::from((1, 1));
    println!("point = {:?}, occupies {} on stack", point, size_of_val(&point));

    // normal Rectangle
    let rect = Rectangle::from((
        Point::from((0, 0)),
        Point::from((10, 10))
    ));
    println!("rect = {:?}, occupies {} on stack", rect, size_of_val(&rect));

    // Point in Box
    let box_point = Box::new(point);
    println!("box_point = {:?}, occupies {} on stack", box_point, size_of_val(&box_point));

    // Rectangle in Box
    let box_rect = Box::new(rect);
    println!("box_rect = {:?}, occupies {} on stack", box_rect, size_of_val(&box_rect));

    let rect_in_box = *box_rect;
    println!("rect_in_box = {:?}, occupies {} on stack", rect_in_box, size_of_val(&rect_in_box));
}

#[allow(unused)]
pub fn test() {
    test_box_size();
}