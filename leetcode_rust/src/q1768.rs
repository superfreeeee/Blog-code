pub struct Solution {}

impl Solution {
    pub fn merge_alternately(word1: String, word2: String) -> String {
        let mut it1 = word1.bytes().into_iter();
        let mut it2 = word2.bytes().into_iter();
        let mut res = String::new();
        for _ in 0..word1.len().max(word2.len()) {
            match it1.next() {
                Some(c) => res.push(char::from(c)),
                None => (),
            };
            match it2.next() {
                Some(c) => res.push(char::from(c)),
                None => (),
            };
        }

        res
    }
}
