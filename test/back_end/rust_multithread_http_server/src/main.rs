mod pool;

use std::net::{TcpListener, TcpStream};
use std::{
    io,
    io::{Read, Write},
};
use pool::ThreadPool;

fn handle_client(mut stream: TcpStream) {
    println!("handle stream");
    let mut buffer = [0u8; 512];
    stream.read(&mut buffer).unwrap();
    println!("stream info read in String: {}\n", String::from_utf8_lossy(&buffer));
    println!("stream info read in [u8]  : {:?}\n", buffer);

    let get = b"GET / HTTP/1.1\r\n";
    let (status_line, content) = if buffer.starts_with(get) {
        ("HTTP/1.1 200 OK\r\n\r\n", "Hello World")
    } else {
        ("HTTP/1.1 404 NOT FOUND\r\n\r\n", "Not found")
    };

    let response = format!("{}{}", status_line, content);

    stream.write(response.as_bytes()).unwrap();
}

fn main() -> io::Result<()> {
    let listener = TcpListener::bind("127.0.0.1:8080")?;
    let pool = ThreadPool::new(2);

    for stream in listener.incoming() {
        println!("incoming a new stream");
        let stream = stream.unwrap();

        pool.execute(|| {
            println!("run a job");
            handle_client(stream);
        });
    }

    Ok(())
}
