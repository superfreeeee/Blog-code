#[test]
fn test() {
    let mut num = 10u32;

    println!("num = {}", num);

    {
        // Shadow by immutable variable
        let num = num;

        // error
        // num = 3;

        println!("num = {}", num);
    }

    num = 3;
    println!("num = {}", num);
}