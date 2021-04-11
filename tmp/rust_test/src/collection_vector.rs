pub fn test_vec() {
    println!("----- test_vec -----");

    // basic vector
    println!("<<< basic vector >>>");
    let v: Vec<i32> = Vec::new();
    println!("emtpy vec: {:?}", v);
    let v = vec![1, 2, 3, 4];
    println!("v: {:?}", v);

    // push
    println!("<<< push >>>");
    let mut v = vec![1, 2, 3];
    println!("v: {:?}", v);
    v.push(4);
    println!("v: {:?}", v);
    v.push(5);
    println!("v: {:?}", v);

    // append
    println!("<<< append >>>");
    let mut v2 = vec![6, 7, 8, 9, 0];
    v.append(&mut v2);
    println!("v: {:?}", v);
    println!("v2: {:?}", v2);

    // get
    println!("<<< get >>>");
    let print_nth = move |v: &Vec<i32>, i: usize| {
        match v.get(i) {
            Some(val) => println!("v[{}] = {}", i, val),
            None => println!("None")
        }
    };
    print_nth(&v, 2);
    print_nth(&v, 10);
    println!("v[{}] = {}", 4, v[4]);
}