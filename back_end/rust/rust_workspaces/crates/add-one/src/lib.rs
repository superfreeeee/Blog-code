use rand;

pub fn add_one(x: i32) -> i32 {
    x + 1
}

pub fn maybe_add_one(x: i32) -> i32 {
    let b: bool = rand::random();
    if b {
        x + 1
    } else {
        x
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(3, add_one(2));
    }

    #[test]
    fn maybe_test() {
        for i in 0..5 {
            let num = 3;
            println!("maybe_add_one({}) = {}", num, maybe_add_one(num));
        }
    }
}
