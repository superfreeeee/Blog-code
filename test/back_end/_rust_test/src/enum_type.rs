pub fn test_enum() {
    println!("----- test_enum -----");

    // basic enum
    println!("<<< basic enum >>>");
    #[derive(Debug)]
    enum Book {
        Papery,
        Electronic,
    }
    let book = Book::Papery;
    let ebook = Book::Electronic;
    println!("{:?}", book);
    println!("{:?}", ebook);

    // enum with tuple property
    println!("<<< enum with tuple property >>>");
    #[derive(Debug)]
    enum BookTuple {
        Papery(u32),
        Electronic(String),
    }
    let book = BookTuple::Papery(123);
    let ebook = BookTuple::Electronic(String::from("url://123456"));
    println!("{:?}", book);
    println!("{:?}", ebook);

    // enum with struct property
    println!("<<< enum with struct property >>>");
    #[derive(Debug)]
    enum BookStruct {
        Papery { index: u32 },
        Electronic { url: String },
    }
    let book = BookStruct::Papery { index: 123 };
    let ebook = BookStruct::Electronic { url: String::from("url://123456") };
    println!("{:?}", book);
    println!("{:?}", ebook);

    // match enum
    println!("<<< match enum >>>");
    match book {
        BookStruct::Papery { index: i } => {
            println!("Papery book {}", i);
        }
        BookStruct::Electronic { url: u } => {
            println!("E-book {}", u);
        }
    }
    match ebook {
        BookStruct::Papery { index } => {
            println!("Papery book {}", index);
        }
        BookStruct::Electronic { ref url } => {
            println!("E-book {}", url);
        }
    }
    println!("{:?}", ebook);

    // match rest (using _)
    println!("<<< match rest condition >>>");
    let s = "abc";
    match s {
        "123" => { println!("catch 123"); }
        _ => { println!("other ") }
    }

    // match Option
    println!("<<< match Option >>>");
    let opt = Option::Some(String::from("test"));
    match opt {
        Option::Some(ref t) => {
            println!("opt == Some({})", t);
        }
        Option::None => {
            println!("opt == None")
        }
    }

    // default Option
    println!("<<< default Option >>>");
    let opt = Some(64);
    match opt {
        Some(n) => println!("Has num: {}", n),
        _ => println!("nothing")
    }

    // match integer
    println!("<<< match integer >>>");
    let i = 0;
    match i {
        0 => println!("state 0"),
        1 => println!("state 1"),
        _ => println!("state default")
    }

    // if let
    let i = 0;
    if let 0 = i {
        println!("i == 0");
    }
}