pub fn test_generic() {
    println!("----- test_generic -----");

    // generic Point
    println!("<<< generic Point >>>");
    let p1: Point<i32> = Point { x: 1, y: 2 };
    let p2: Point<f64> = Point { x: 1.0, y: 2.0 };
    println!("p1 = {:?}", p1);
    println!("p2 = {:?}", p2);
    let p3: Point2<i32, f64> = Point2 { x: 1, y: 2.0 };
    println!("p3 = {:?}", p3);

    // struct impl generic
    println!("<<< struct impl generic >>>");
    println!("p1.x = {:?}", p1.x());

    // struct impl inner fn generic
    println!("<<< struct impl inner fn generic >>>");
    let p4 = p3.mixup(Point2 { x: 123, y: 456 });
    println!("p4 = {:?}", p4);
}

#[derive(Debug)]
struct Point<T> {
    x: T,
    y: T,
}

#[derive(Debug)]
struct Point2<T1, T2> {
    x: T1,
    y: T2,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

impl<T, U> Point2<T, U> {
    fn mixup<V, W>(self, other: Point2<V, W>) -> Point2<T, W> {
        Point2 { x: self.x, y: other.y }
    }
}
