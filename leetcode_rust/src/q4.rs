pub struct Solution {}

use std::cmp::min;
impl Solution {
    /**
     * 1. 顺序查找
     */
    // pub fn find_median_sorted_arrays(nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {
    //     let left_index = (nums1.len() + nums2.len() + 1) / 2;
    //     let right_index = (nums1.len() + nums2.len() + 2) / 2;
    //     let mut res = 0f64;
    //     let mut cur = 0;
    //     let mut i = 0;
    //     let mut j = 0;
    //     while i < nums1.len() || j < nums2.len() {
    //         if j == nums2.len() || (i < nums1.len() && nums1[i] < nums2[j]) {
    //             cur = nums1[i];
    //             i += 1;
    //         } else {
    //             cur = nums2[j];
    //             j += 1;
    //         }

    //         if i + j == left_index {
    //             res += cur as f64;
    //         }
    //         if i + j == right_index {
    //             res += cur as f64;
    //             break;
    //         }
    //     }

    //     res / 2.0
    // }

    /**
     * 2. 二分查找
     */
    pub fn find_median_sorted_arrays(nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {
        let left_index = (nums1.len() + nums2.len() + 1) / 2;
        let right_index = (nums1.len() + nums2.len() + 2) / 2;
        (find_k(&nums1, 0, &nums2, 0, left_index) + find_k(&nums1, 0, &nums2, 0, right_index))
            as f64
            / 2.0
    }
}

fn find_k(v1: &Vec<i32>, i: usize, v2: &Vec<i32>, j: usize, k: usize) -> i32 {
    if i >= v1.len() {
        return v2[j + k - 1];
    }

    if j >= v2.len() {
        return v1[i + k - 1];
    }

    if k == 1 {
        return min(v1[i], v2[j]);
    }

    let mid1 = if i + k / 2 - 1 < v1.len() {
        v1[i + k / 2 - 1]
    } else {
        i32::MAX
    };
    let mid2 = if j + k / 2 - 1 < v2.len() {
        v2[j + k / 2 - 1]
    } else {
        i32::MAX
    };

    if mid1 < mid2 {
        find_k(v1, i + k / 2, v2, j, k - k / 2)
    } else {
        find_k(v1, i, v2, j + k / 2, k - k / 2)
    }
}

mod tests {
    use super::Solution;

    #[test]

    fn test() {
        let res = Solution::find_median_sorted_arrays(vec![1, 3], vec![2]);
        println!("res = {}", res);
        assert_eq!(res, 2.0);
        let res = Solution::find_median_sorted_arrays(vec![1, 2], vec![3, 4]);
        println!("res = {}", res);
        assert_eq!(res, 2.5);
    }
}
