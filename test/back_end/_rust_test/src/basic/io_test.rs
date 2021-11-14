use std::fs::File;
use std::io::{Write, BufReader, BufRead, Error};
use std::path::Path;

fn read_as_path(path: &Path) {
    let path_str = path.to_str().unwrap();
    println!(">>>>> path(\"{}\")         = {:?}", path_str, path);
    // 相对/绝对路径
    println!("path(\"{}\").is_relative() = {}", path_str, path.is_relative());
    println!("path(\"{}\").is_absolute() = {}", path_str, path.is_absolute());

    // file detail
    println!("path(\"{}\").exists()      = {}", path_str, path.exists());
    println!("path(\"{}\").file_name()   = {:?}", path_str, path.file_name());
    println!("path(\"{}\").exists()      = {:?}", path_str, path.extension());

    // 文件/目录
    println!("path(\"{}\").is_file()     = {}", path_str, path.is_file());
    println!("path(\"{}\").is_dir()      = {}", path_str, path.is_dir());

    // Debug / Display / String
    println!("path(\"{}\").display()     = {}", path_str, path.display());


    match path.read_dir() {
        Ok(dir) => {
            println!("path.read_dir() Ok: {:?}", dir);
        }
        Err(e) => {
            println!("path.read_dir() err: {}", e);
        }
    }
    println!();
}

/// Path 类型测试
/// ```
/// std::path::Path
/// ```
#[allow(unused)]
fn test_path() {
    read_as_path(Path::new("."));
    read_as_path(Path::new("./assets"));
    read_as_path(Path::new("./assets/text.txt"));
}

/// 文件读写
#[allow(unused)]
fn test_file_read() -> Result<(), Error> {
    let path = Path::new("./assets/test_read_write.txt");

    /// File::create 创建文件
    println!(">>> File::create");
    let mut file = File::create(path)?;
    write!(file, "Rust is Fun 💖\n")?;

    /// BufReader 按行读文件
    println!(">>> File::open + BufReader.lines()");
    let file = File::open(path)?;
    let reader = BufReader::new(file);
    for (i, line) in reader.lines().enumerate() {
        println!("line({}): {}", i, line?);
    }

    /// BufReader 按字节读文件
    println!(">>> BufReader.fill_buf");
    let mut reader = BufReader::new(File::open(path)?);
    println!("buf: {:?}", reader.fill_buf()?);
    print!("buf: [ ");
    for c in reader.fill_buf()? {
        print!("{} ", c);
    }
    println!("]");
    let mut line = String::new();
    reader.read_line(&mut line);
    println!("line: {}", line);

    /// 读图片文件
    println!(">>> read .png file");
    let mut reader = BufReader::new(File::open(Path::new("./assets/test_image.png"))?);
    let mut buf = reader.fill_buf()?;
    println!("buf = {:?}", buf);

    let s = &buf[0..6];
    println!("s = {:?}", String::from_utf8_lossy(s));

    Ok(())
}

fn is_file_png(path: &str) -> Result<(), Error> {
    use super::super::utils::file_type;

    let is_png = file_type::is_png(&File::open(Path::new(path))?)?;
    println!("{} is png? {}", path, is_png);

    Ok(())
}

fn test_file_type() -> Result<(), Error> {
    is_file_png("./assets/test_image.png");
    is_file_png("./assets/text.txt");

    Ok(())
}

#[allow(unused)]
pub fn test() {
    // test_path();
    test_file_read();
    test_file_type();
}