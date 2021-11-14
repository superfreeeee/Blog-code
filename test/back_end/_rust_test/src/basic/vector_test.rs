fn print_vector(vec: &Vec<i32>, source: &str) {
    println!("vec from {}", source);
    println!("    vec     : {:?}", vec);
    println!("    len     : {}", vec.len());
    println!("    capacity: {}", vec.capacity());
}

/// Vec 创建测试
#[allow(unused)]
fn test_vector_creation() {
    print_vector(&Vec::new(), "Vec::new()");
    print_vector(&vec![1, 2, 3, 4, 5], "vec!");
    print_vector(&(1..10).collect(), "Iterator.collect()");
    print_vector(&Vec::from([1, 2, 3, 4, 5]), "Vec::from()");
    print_vector(&Vec::with_capacity(5), "Vec::with_capacity()");
}

fn print_vector_simple(vec: &Vec<i32>) {
    println!("len = {}, capacity = {}, data = {:?}", vec.len(), vec.capacity(), vec);
}

/// Vec 数据操作
#[allow(unused)]
fn test_vector_operation() {
    let mut vec = vec![1, 2, 3, 4, 5];
    println!(">>> init vec");
    print_vector_simple(&vec);

    /// push data
    /// ```rs
    /// vec.push(value)
    /// ```
    println!(">>> push");
    vec.push(6);
    vec.push(7);
    vec.push(8);
    print_vector_simple(&vec);

    /// push data over capacity
    println!(">>> push 2");
    vec.push(9);
    vec.push(10);
    vec.push(11);
    print_vector_simple(&vec);

    /// pop data
    /// ```
    /// vec.pop()
    /// ```
    println!(">>> pop");
    vec.pop();
    print_vector_simple(&vec);
    vec.pop();
    print_vector_simple(&vec);
    vec.pop();
    print_vector_simple(&vec);

    /// insert data
    /// ```
    /// vec.insert(index, value)
    /// ```
    println!(">>> insert");
    vec.insert(0, 0);
    vec.insert(0, -1);
    vec.insert(0, -2);
    vec.insert(0, -3);
    vec.insert(0, -4);
    print_vector_simple(&vec);

    /// remove data
    /// ```
    /// vec.remove(index)
    /// ```
    println!(">>> remove");
    vec.remove(0);
    print_vector_simple(&vec);
    vec.remove(1);
    print_vector_simple(&vec);
    vec.remove(2);
    print_vector_simple(&vec);
}

/// Vec 遍历
#[allow(unused)]
fn test_vector_traversal() {
    let vec: Vec<i32> = (0..5).collect();
    println!(">>> vec init");
    print_vector_simple(&vec);

    /// Vec move 遍历
    println!(">>> vec");
    for i in vec {
        // `vec` moved due to this implicit call to `.into_iter()`
        println!("i = {}", i);
    }

    let vec: Vec<i32> = (0..5).collect(); // vec moved, so re-alloc

    /// Vec 引用遍历
    println!(">>> &vec");
    for i in &vec {
        println!("i = {}", i);
    }

    /// Vec 创建迭代器
    ///     等价于 for i in &vec
    println!(">>> vec.iter()");
    for i in vec.iter() {
        println!("i = {}", i);
    }

    /// Vec 创建枚举
    println!(">>> vec.iter().enumerate()");
    for (i, val) in vec.iter().enumerate() {
        println!("i = {}, val = {}, vec[i] = {}", i, val, vec[i]);
    }

    let mut vec = vec; // change mutability of vec

    /// Vec 可变迭代
    /// ```
    /// for x in vec.iter_mut
    /// ```
    /// 时，x 为 &mut i32 类型
    println!(">>> vec.iter_mut()");
    for x in vec.iter_mut() {
        *x *= 10;
    }
    print_vector_simple(&vec);
}

#[allow(unused)]
pub fn test() {
    // test_vector_creation();
    // test_vector_operation();
    test_vector_traversal();
}