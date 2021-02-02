pub fn test_reference() {
    println!("----- test_reference -----");

    println!("<<< normal reference >>>");
    let s1: String = String::from("superfree");
    let s2 = &s1;
    println!("s1 = {}", s1);
    println!("s2 = {}", s2);

    println!("<<< fn param reference >>>");
    let s = String::from("superfree");
    let len = get_str_len(&s);
    println!("len({}) = {}", s, len);

    println!("<<< mutable reference >>>");
    let mut s = String::from("test");
    println!("s = {}", s);
    s = String::from("test2");
    println!("s = {}", s);
    let ms = &mut s;
    println!("ms = {}", ms);
    ms.push_str("_other");
    println!("ms = {}", ms);
    println!("s = {}", s);
}

fn get_str_len(s: &String) -> usize {
    s.len()
}