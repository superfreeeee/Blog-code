pub fn test_string() {
    println!("----- test_string -----");

    // empty
    println!("<<< empty string >>>");
    let s = String::new();
    println!("s: {}", s);

    // primitive type to_string
    println!("<<< primitive type to_string >>>");
    let one = 1.to_string();
    println!("one: {}", one);
    let one_point_three = 1.3.to_string();
    println!("one_point_three: {}", one_point_three);
    let str = "hello".to_string();
    println!("str: {}", str);

    // append (using append & +)
    println!("<<< append (using append & +) >>>");
    let mut s = String::from("Init");
    s.push('!');
    s.push_str(" Other words.");
    println!("s: {}", s);
    let s = String::from("Hello");
    let s2 = String::from("World");
    let s3 = s + " " + &s2 + "!";
    println!("s3: {}", s3);

    // format!
    println!("<<< format! >>>");
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s3 = String::from("toe");
    let s = format!("{}-{}-{}", s1, s2, s3);
    println!("{}", s);

    // others: len, chars, count
    println!("<<< others: len, chars, count, nth >>>");
    let s = String::from("superfree超悠閒");
    println!("len: {}", s.len());
    println!("count: {:?}", s.chars());
    println!("count: {:?}", s.chars().count());
    println!("s[{}] = {}", 2, s.chars().nth(2).unwrap());
}