pub struct Solution {}

impl Solution {
    pub fn sort_jumbled(mapping: Vec<i32>, mut nums: Vec<i32>) -> Vec<i32> {
        nums.sort_by_key(|num: &i32| {
            let option_key = num
                .to_string()
                .bytes()
                .into_iter()
                .map(|b| b - b'0')
                .map(|n| mapping[n as usize])
                .reduce(|sum, n| sum * 10 + n);

            match option_key {
                Some(key) => key,
                None => 0,
            }
        });

        nums
    }
}
