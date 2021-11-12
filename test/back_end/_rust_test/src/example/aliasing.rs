#[derive(Debug)]
struct Point { x: i32, y: i32, z: i32 }

#[allow(dead_code)]
pub fn test() {
    let mut point = Point { x: 100, y: 200, z: 300 };
    println!("point = {:?}", point);

    let immut_borrow1 = &point;
    let immut_borrow2 = &point;
    println!("immutable borrow 1 = {:?}", immut_borrow1);
    println!("immutable borrow 2 = {:?}", immut_borrow2);

    // let mut_borrow0 = &mut point;
    let mut_borrow = &mut point;
    // let mut_borrow2 = &mut point;
    println!("mutable borrow = {:?}", mut_borrow);
    mut_borrow.x *= -1;
    println!("mutable borrow = {:?}", mut_borrow);

    let immut_borrow1 = &point;
    println!("immutable borrow 1 = {:?}", immut_borrow1);

    let ref immut_borrow1 = point;
    let ref immut_borrow2 = point;
    println!("immutable borrow 1 = {:?}", immut_borrow1);
    println!("immutable borrow 2 = {:?}", immut_borrow2);
}