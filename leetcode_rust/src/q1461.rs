pub struct Solution {}

impl Solution {
    pub fn has_all_codes(s: String, k: i32) -> bool {
        if (s.len() as i32) < (1 << k) + k - 1 {
            return false;
        }

        let mut num = usize::from_str_radix(&s[..k as usize], 2).unwrap();

        let mut has = vec![false; 1 << k];
        has[num] = true;
        let mut count = 1;
        let mask = has.len() - 1;
        for b in s.bytes().skip(k as usize) {
            num = ((num << 1) + (b - b'0') as usize) & mask;
            if !has[num] {
                has[num] = true;
                count += 1;
            }
        }

        count == has.len()
    }
}
