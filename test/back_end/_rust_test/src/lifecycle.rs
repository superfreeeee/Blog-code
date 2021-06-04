pub fn test_lifecycle() {
    println!("----- test_lifecycle -----");

    // first try
    println!("<<< life cycle first try >>>");
    let r;
    {
        let x = 5;
        r = &x;
        println!("r: {}", r);
    }
    // println!("r: {}", r); // &x not long enough

    // using reference comment
    println!("<<< using reference comment >>>");
    let r;
    {
        let s1 = "123123";
        let s2 = "456";
        r = longer(s1, s2);
        println!("r: {}", r);
    }
    println!("r: {}", r);
}

fn longer<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s1.len() > s2.len() { s1 } else { s2 }
}