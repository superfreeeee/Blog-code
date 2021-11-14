use std::fs::File;
use std::io::{BufRead, BufReader, Error};

#[allow(unused)]
pub fn is_png(_file: &File) -> Result<bool, Error> {
    let mut reader = BufReader::new(_file);
    let buf = reader.fill_buf()?;
    match buf[0..8] {
        [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A] => Ok(true),
        _ => Ok(false)
    }
}