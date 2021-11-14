use std::io::{Read, Write, Seek, SeekFrom};
use std::fs::OpenOptions;

pub fn test_fs_and_io() {
    println!("----- test_fs_and_io -----");

    // get args
    println!("<<< get args >>>");
    let args = std::env::args();
    println!("args: {:?}", args);
    for arg in args {
        println!("arg: {}", arg);
    }

    // std input
    println!("<<< std input >>>");
    // use std::io::stdin;
    // let mut buf = String::new();
    // stdin().read_line(&mut buf).expect("Failed to read line");
    // let buf = buf.trim();
    // println!("input: {}, len={}", buf, buf.len());

    // read file
    println!("<<< read file >>>");
    use std::fs;
    let hello_path = "hello.txt";
    let text = fs::read_to_string(hello_path).unwrap();
    println!("text.txt from hello.txt:\n{}", text);

    // read binary file
    println!("<<< read binary file >>>");
    let content = fs::read(hello_path).unwrap();
    println!("content from hello.txt:\n{:?}", content);

    // read binary file flow
    println!("<<< read binary file flow >>>");
    let mut buf = [0u8; 5];
    let mut file = fs::File::open(hello_path).unwrap();
    let mut len;
    len = file.read(&mut buf).unwrap();
    println!("buf: {:?}", &buf[0..len]);
    len = file.read(&mut buf).unwrap();
    println!("buf: {:?}", &buf[0..len]);
    len = file.read(&mut buf).unwrap();
    println!("buf: {:?}", &buf[0..len]);

    // write file
    println!("<<< write file >>>");
    fs::write("hello2.txt", "content writing from rust program").unwrap();

    // write file flow
    println!("<<< write file flow >>>");
    let mut file = fs::File::create("hello3.txt").unwrap();
    file.write(b"content for hello3.txt").unwrap();

    // append mode (with OpenOptions)
    println!("<<< append mode >>>");
    let mut file = OpenOptions::new().append(true).create(true).open("hello4.txt").unwrap();
    file.write(b"append line\n").unwrap();

    // read write mode
    println!("<<< read write mode >>>");
    let mut file = OpenOptions::new().create(true).read(true).write(true).open("hello5.txt").unwrap();
    let mut str = String::new();
    let len = file.write(b"hello\n").unwrap();
    file.seek(SeekFrom::Start(0)).unwrap();
    file.read_to_string(&mut str).unwrap();
    println!("write len: {}, content:\n{}", len, str);

    file.seek(SeekFrom::Start(len as u64)).unwrap();
    let mut str = String::new();
    let len = file.write(b"next line\n").unwrap();
    file.seek(SeekFrom::Start(0)).unwrap();
    file.read_to_string(&mut str).unwrap();
    println!("write len: {}, content:\n{}", len, str);
}