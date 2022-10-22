pub struct Solution {}

impl Solution {
    pub fn permute(mut nums: Vec<i32>) -> Vec<Vec<i32>> {
        fn dfs(nums: &mut Vec<i32>, res: &mut Vec<Vec<i32>>, s: usize) {
            if s == nums.len() {
                res.push(nums.to_vec());
                return;
            }

            for i in s..nums.len() {
                nums.swap(s, i);
                dfs(nums, res, s + 1);
                nums.swap(s, i);
            }
        }

        let mut res = vec![];
        dfs(&mut nums, &mut res, 0);
        res
    }
}
