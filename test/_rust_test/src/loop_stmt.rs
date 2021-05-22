pub fn test_loop_stmt() {
    println!("----- test_loop_stmt -----");

    // test while
    println!("<<< from 0 to 4 >>>");
    let mut i = 0;
    while i < 4 {
        println!("i = {}", i);
        i += 1;
    }

    // for array
    println!("<<< for i in nums.iter() >>>");
    let nums = [1, 2, 3, 4, 5];
    for num in nums.iter() {
        println!("num: {}", num);
    }

    // for in
    println!("<<< from 0 to 4 (for i in 0..5) >>>");
    for i in 0..5 {
        println!("i: {}", i);
    }

    // loop
    println!("<<< loop (traversal char[] until O) >>>");
    let s = ['R', 'U', 'N', 'O', 'O', 'B'];
    let mut i = 0;
    loop {
        let ch = s[i];
        if ch == 'O' {
            break;
        }
        println!("\'{}\'", ch);
        i += 1;
    }
    println!("'O' is at s[{}] = {}", i, s[i]);
}