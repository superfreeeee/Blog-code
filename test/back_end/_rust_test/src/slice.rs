pub fn test_slice() {
    println!("----- test_slice -----");

    println!("<<< slice string >>>");
    let s = String::from("superfree");
    let part1 = &s[0..5];
    let partx = &s[5..];
    println!("{} = {} || {}", s, part1, partx);

    println!("<<< slice array >>>");
    let a = [1, 2, 3, 4, 5];
    let part = &a[0..3];
    for i in part.iter() {
        println!("i = {}", i);
    }
}