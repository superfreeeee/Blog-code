use std::net::{TcpListener, TcpStream};
use std::io;
use std::io::{Read, Write};
use std::time::Duration;
use std::thread;

type EmptyIOResult = io::Result<()>;

fn handle_client(mut stream: TcpStream) {
    let mut buffer = [0u8; 512];
    stream.read(&mut buffer).unwrap();

    let get = b"GET / HTTP/1.1\r\n";
    let (status, content) = if buffer.starts_with(get) {
        ("HTTP/1.1 404 NOT FOUND\r\n\r\n", "Not found\n")
        // ("HTTP/1.1 200 OK\r\n\r\n", "Hello World\n")
    } else {
        ("HTTP/1.1 404 NOT FOUND\r\n\r\n", "Not found\n")
    };

    let response = format!("{}{}", status, content);
    println!("response = {}", response);

    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();

    let time = Duration::from_millis(3000);

    thread::sleep(time);
    println!("thread woke up");
}

fn run_listener(addr: &str) -> EmptyIOResult {
    let listener = TcpListener::bind(addr)?;

    let mut stream_count = 0;

    for stream in listener.incoming() {
        stream_count += 1;
        println!("stream_count = {}", stream_count);
        handle_client(stream?);
    }

    Ok(())
}

#[allow(unused)]
fn run_connector(addr: &str) -> EmptyIOResult {
    let mut connection = TcpStream::connect(addr)?;
    connection.write("Hello World\0".as_bytes());
    drop(connection);

    Ok(())
}

// #[test]
#[allow(unused)]
pub fn test() {
    println!("========== net test ==========");
    let addr = "127.0.0.1:8080";

    println!("Starting Server ...");
    run_listener(addr);
    println!("Simple Http Server listening at {} ...", addr);

    // println!("Starting Client ...");
    // run_connector(addr);
}
