pub struct Solution {}

use std::ops::Rem;
impl Solution {
    /**
     * 1. 暴力破解
     *
     * input: s
     *
     * res
     *
     * loop 1: 字符串循环位移
     *   rotated_s = rotate(s)
     *   loop 2: 循环偶数位寻找最小字符串
     *     loop 3: 循环奇数位寻找最小字符串
     *       try_s = rotated_s
     *       try_s = add_even(add_odd(try_s))
     *       res = min(res, try_s)
     *
     */
    // pub fn find_lex_smallest_string(s: String, a: i32, b: i32) -> String {
    //     let n = s.len();
    //     let a = a as u8;
    //     let b = b as usize;

    //     let mut res = s.clone();

    //     let s = s.bytes().map(|b| b - b'0').collect::<Vec<_>>();
    //     let rotate_step = gcd(b, n);
    //     let even_times: u8 = if rotate_step & 1 == 0 { 1 } else { 10 };
    //     for offset in (0..n).step_by(rotate_step) {
    //         let mut rotated_s = s.clone();
    //         rotated_s.rotate_right(offset);

    //         for i in 0..10u8 {
    //             for j in 0..even_times {
    //                 let mut sub = rotated_s.clone();
    //                 // 奇数位增加
    //                 for k in (1..n).step_by(2) {
    //                     sub[k] = (sub[k] + i * a) % 10;
    //                 }
    //                 for k in (0..n).step_by(2) {
    //                     sub[k] = (sub[k] + j * a) % 10;
    //                 }
    //                 let sub = String::from_utf8(sub.iter().map(|n| n + b'0').collect::<Vec<_>>())
    //                     .unwrap();

    //                 res = res.min(sub);
    //             }
    //         }
    //     }

    //     res
    // }

    /**
     * 2. 每次循环能直接确定最小组合
     *
     * input: s
     *
     * res
     *
     * loop 1: 字符串循环位移
     *   rotated_s = rotate(s)
     *   try_s = add_even(add_odd(rotated_s))
     *   res = min(res, try_s)
     *
     */
    pub fn find_lex_smallest_string(s: String, a: i32, b: i32) -> String {
        let n = s.len();
        let a = a as u8;
        let b = b as usize;

        let mut res = s.clone();

        let s = s.bytes().map(|b| b - b'0').collect::<Vec<_>>();
        let rotate_step = gcd(b, n);
        let acc_step = gcd(a, 10);

        let add = |sub: &mut Vec<u8>, odd: bool| {
            let pos: usize = if odd { 1 } else { 0 };
            let (mut low, mut acc) = (sub[pos], 0);

            let mut try_acc = acc_step;
            while try_acc < 10 {
                let n = (sub[pos] + try_acc) % 10;
                if n < low {
                    low = n;
                    acc = try_acc;
                }
                try_acc += acc_step;
            }

            for i in (pos..n).step_by(2) {
                sub[i] = (sub[i] + acc) % 10;
            }
        };

        for offset in (0..n).step_by(rotate_step) {
            let mut rotated_s = s.clone();
            rotated_s.rotate_right(offset);

            add(&mut rotated_s, true);
            if rotate_step & 1 == 1 {
                add(&mut rotated_s, false);
            }

            let sub =
                String::from_utf8(rotated_s.iter().map(|n| n + b'0').collect::<Vec<_>>()).unwrap();
            res = res.min(sub);
        }

        res
    }
}

fn gcd<T>(x: T, y: T) -> T
where
    T: PartialEq + PartialOrd + Rem<Output = T> + Default + Copy,
{
    if x > y {
        return gcd(y, x);
    }
    if x == T::default() {
        return y;
    }

    return gcd(y % x, x);
}
