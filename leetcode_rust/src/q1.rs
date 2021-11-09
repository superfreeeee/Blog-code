use std::collections::HashMap;

fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut map = HashMap::with_capacity(nums.len());
    for i in 0..nums.len() {
        if let Some(k) = map.get(&(target - nums[i])) {
            if *k != i {
                return vec![*k as i32, i as i32];
            }
        }
        map.insert(nums[i], i);
    }

    panic!("not found");
}

pub fn test() {
    println!(">>>>> question2.test");
    let res = two_sum(vec![1, 3, 5, 7, 9], 6);
    println!("{:?}", res);
}
