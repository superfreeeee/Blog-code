// Option cna return Some or None
// we can use several ways to catch it
// 1. match
// 2. assignment expression
fn catch_by_match(option: Option<u32>) {
    match option {
        Some(val) => {
            println!("match Option::Some({})", val);
        }
        None => {
            println!("match Option::None")
        }
    }
}

fn catch_by_assign_exp(option: Option<u32>) {
    if let Some(val) = option {
        println!("match Option::Some({})", val);
    } else {
        println!("match Option::None")
    }
}

fn test_return() {
    catch_by_match(None);
    catch_by_match(Some(32));
    catch_by_assign_exp(None);
    catch_by_assign_exp(Some(32));
}

#[allow(unused)]
pub fn test() {
    test_return();
}