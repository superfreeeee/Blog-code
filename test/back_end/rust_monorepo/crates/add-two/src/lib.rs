pub fn add_two(x: i32) -> i32 {
    x + 2
}

#[cfg(test)]
mod tests {
    use crate::add_two;

    #[test]
    fn it_works() {
        let num = 2;
        assert_eq!(4, add_two(num));
    }
}
