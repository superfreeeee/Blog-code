use std::collections::HashMap;

pub fn test_hashmap() {
    println!("----- test_hashmap -----");

    // basic hashmap
    println!("<<< basic hashmap >>>");
    let mut map = HashMap::new();
    map.insert("123", "abc");
    map.insert("456", "def");
    println!("{:?}", map);
    println!("{}", map.get("123").unwrap());
    for item in map.iter() {
        println!("{:?}", item);
    }

    // insert
    println!("<<< insert >>>");
    map.insert("789", "ghi"); // basic insert
    println!("{:?}", map);
    map.insert("123", "kkk"); // overwrite
    println!("{:?}", map);
    map.entry("111").or_insert("hhh"); // insert if not exist
    println!("{:?}", map);

    // other option insert
    println!("<<< other option insert >>>");
    if let Some(x) = map.get_mut("123") {
        *x = "b";
    }
    println!("{:?}", map);

}