pub fn test_primitive() {
    println!("----- test_primitive -----");

    // integer
    println!("<<< integer >>>");
    let _i8_max: i8 = 127;
    let _i8_min: i8 = -128;
    println!("_i8_max = {}", _i8_max);
    println!("_i8_min = {}", _i8_min);
    let _u8_max: u8 = 255;
    let _u8_min: u8 = 0;
    println!("_u8_max = {}", _u8_max);
    println!("_u8_min = {}", _u8_min);
    let dec = 123;
    let hex = 0x123;
    let oct = 0o123;
    let bin = 0b1111_1111;
    println!("dec = {}", dec);
    println!("hex = {}", hex);
    println!("oct = {}", oct);
    println!("bin = {}", bin);

    // float
    println!("<<< float >>>");
    let _f32: f32 = 2.0;
    let _f64: f64 = 2.0;
    println!("_f32 = {}", _f32);
    println!("_f64 = {}", _f64);
    let f = 2.0;
    println!("f = {}", f);
    println!("{} + {} = {}", 123, 2.0, 123.0 + 2.0);

    // bool
    println!("<<< bool >>>");
    let t: bool = true;
    let f = false;
    println!("t = {}", t);
    println!("f = {}", f);

    // tuple
    println!("<<< tuple >>>");
    let t = (1, 2.0, "123");
    let (a, b, c) = t;
    println!("t = {:?}", t);
    println!("a = {}", a);
    println!("b = {}", b);
    println!("c = {}", c);

    // array
    println!("<<< array >>>");
    let a: [u32; 4] = [1, 2, 3, 4];
    println!("a: [u32; 4] = {:?}", a);
    let a = [1, 2, 3, 4, 5];
    println!("a = {:?}", a);
    let a = ["superfree", "superfree", "123456"];
    println!("a = {:?}", a);
    let mut a = ["superfree", "superfree", "123456"];
    println!("mut a = {:?}", a);
    a[0] = "123";
    println!("mut a = {:?}", a);
}