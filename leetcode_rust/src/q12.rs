pub struct Solution {}

impl Solution {
    pub fn int_to_roman(num: i32) -> String {
        let mut num = num as u32;
        let map = [
            (1000, "M"),
            (900, "CM"),
            (500, "D"),
            (400, "CD"),
            (100, "C"),
            (90, "XC"),
            (50, "L"),
            (40, "XL"),
            (10, "X"),
            (9, "IX"),
            (5, "V"),
            (4, "IV"),
            (1, "I"),
        ];
        let mut res = String::new();
        for (limit, unit) in map {
            if num >= limit {
                let n = num / limit;
                res.push_str(unit.repeat(n as usize).as_str());
                num -= limit * n;
            }
        }

        res
    }
}
