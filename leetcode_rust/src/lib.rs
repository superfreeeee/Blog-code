mod q1;
mod q11;
mod q12;
mod q1461;
mod q1625;
mod q1768;
mod q19;
mod q2;
mod q21;
mod q2191;
mod q3;
mod q4;
mod q46;
mod q826;

pub struct Solution {}

mod tests {
    use crate::{q11, q12, q1461, q1625, q1768, q19, q21, q2191, q3, q46, q826};

    #[test]
    fn test_free() {
        // let mut data = 123;
        // let data_ref = &mut data;
        // let res = data.min(123);
        // *data_ref = 123;
        // let mut other = Box::new(456);
        // data_ref = &mut other;
    }

    #[test]
    fn test_q21() {
        let res = q21::Solution::merge_two_lists(
            q21::ListNode::from(vec![1, 2, 4]),
            q21::ListNode::from(vec![1, 3, 4]),
        );
        println!("res={:?}", res);
    }

    #[test]
    fn test_q19() {
        let res = q19::Solution::remove_nth_from_end(q19::ListNode::from(vec![1, 2, 3, 4, 5]), 2);
        println!("res={:?}", res);
        let res = q19::Solution::remove_nth_from_end(q19::ListNode::from(vec![1]), 1);
        println!("res={:?}", res);
        let res = q19::Solution::remove_nth_from_end(q19::ListNode::from(vec![1, 2]), 1);
        println!("res={:?}", res);
    }

    #[test]
    fn test_q12() {
        let res = q12::Solution::int_to_roman(3);
        assert_eq!("III", res);
        let res = q12::Solution::int_to_roman(4);
        assert_eq!("IV", res);
        let res = q12::Solution::int_to_roman(9);
        assert_eq!("IX", res);
        let res = q12::Solution::int_to_roman(58);
        assert_eq!("LVIII", res);
        let res = q12::Solution::int_to_roman(1994);
        assert_eq!("MCMXCIV", res);
    }

    #[test]
    fn test_q3() {
        let res = q3::Solution::length_of_longest_substring(String::from("abcabcbb"));
        assert_eq!(3, res);
        let res = q3::Solution::length_of_longest_substring(String::from("bbbbb"));
        assert_eq!(1, res);
        let res = q3::Solution::length_of_longest_substring(String::from("pwwkew"));
        assert_eq!(3, res);
        let res = q3::Solution::length_of_longest_substring(String::from(" "));
        assert_eq!(1, res);
    }

    #[test]
    fn test_q2191() {
        let res =
            q2191::Solution::sort_jumbled(vec![8, 9, 4, 0, 2, 1, 3, 5, 7, 6], vec![991, 338, 38]);
        assert_eq!(vec![338, 38, 991], res);
    }

    #[test]
    fn test_q1768() {
        let res = q1768::Solution::merge_alternately(String::from("abc"), String::from("pqr"));
        assert_eq!("apbqcr", res);
        let res = q1768::Solution::merge_alternately(String::from("ab"), String::from("pqrs"));
        assert_eq!("apbqrs", res);
        let res = q1768::Solution::merge_alternately(String::from("abcd"), String::from("pq"));
        assert_eq!("apbqcd", res);
    }

    #[test]
    fn test_q1625() {
        let res = q1625::Solution::find_lex_smallest_string(String::from("5525"), 9, 2);
        assert_eq!(String::from("2050"), res);
        let res = q1625::Solution::find_lex_smallest_string(String::from("74"), 5, 1);
        assert_eq!(String::from("24"), res);
        let res = q1625::Solution::find_lex_smallest_string(String::from("0011"), 4, 2);
        assert_eq!(String::from("0011"), res);
        let res = q1625::Solution::find_lex_smallest_string(String::from("43987654"), 7, 3);
        assert_eq!(String::from("00553311"), res);
    }

    #[test]
    fn test_q1461() {
        let res = q1461::Solution::has_all_codes(String::from("01100"), 2);
        assert_eq!(true, res);
        let res = q1461::Solution::has_all_codes(String::from("00110110"), 2);
        assert_eq!(true, res);
        let res = q1461::Solution::has_all_codes(String::from("0110"), 1);
        assert_eq!(true, res);
        let res = q1461::Solution::has_all_codes(String::from("0110"), 2);
        assert_eq!(false, res);
    }

    #[test]
    fn test_q46() {
        let res = q46::Solution::permute(vec![1, 2, 3]);
        assert_eq!(6, res.len());
        let res = q46::Solution::permute(vec![0, 1]);
        assert_eq!(2, res.len());
        let res = q46::Solution::permute(vec![1]);
        assert_eq!(1, res.len());
    }

    #[test]
    fn test_q826() {
        let res = q826::Solution::max_profit_assignment(
            vec![2, 4, 6, 8, 10],
            vec![10, 20, 30, 40, 50],
            vec![4, 5, 6, 7],
        );
        assert_eq!(100, res);
        let res = q826::Solution::max_profit_assignment(
            vec![85, 47, 57],
            vec![24, 66, 99],
            vec![40, 25, 25],
        );
        assert_eq!(0, res);
    }

    #[test]
    fn test_q11() {
        let res = q11::Solution::max_area(vec![1, 8, 6, 2, 5, 4, 8, 3, 7]);
        assert_eq!(49, res);
        let res = q11::Solution::max_area(vec![1, 1]);
        assert_eq!(1, res);
    }
}
