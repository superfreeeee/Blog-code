pub struct Solution {}

use std::collections::HashMap;
impl Solution {
    pub fn length_of_longest_substring(s: String) -> i32 {
        let mut map: HashMap<u8, i32> = HashMap::new();
        let mut max_len = 0;
        let mut i = -1;
        let bytes = s.as_bytes();
        for (j, c) in bytes.iter().enumerate() {
            let j = j as i32;
            if map.contains_key(c) && *map.get(c).unwrap() > i {
                i = *map.get(c).unwrap();
            }
            max_len = max_len.max(j - i);
            map.insert(*c, j);
            // println!("{:?}, i={}, j={}, max_len={}", map, i, j, max_len);
        }
        max_len as i32
    }
}
