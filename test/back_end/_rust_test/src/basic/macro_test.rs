mod designator {
    // macro designator 宏指示器
    macro_rules! create_func {
        ($func_name: ident) => {
            fn $func_name() {
                println!("invoke fn {:?}()", stringify!($func_name));
            }
        };
    }

    create_func!(foo);
    create_func!(bar);

    macro_rules! print_result {
    // This macro takes an expression of type `expr` and prints
    // it as a string along with its result.
    // The `expr` designator is used for expressions.
    ($expression: expr) => {
        // `stringify!` will convert the expression *as it is* into a string.
        println!("{:?} = {:?}",
                 stringify!($expression),
                 $expression);
    };
}

    pub fn test() {
        println!(">>>>> macro designator");
        foo();
        bar();

        print_result!(1u32 + 1);
        print_result!({
        let x = 1;
        let y = 2;
        let z = x + y;
        z
    });

        println!();
    }
}

mod overload {
    // macro overload 宏重载
// `test!` will compare `$left` and `$right`
// in different ways depending on how you invoke it:
    macro_rules! test {
    // Arguments don't need to be separated by a comma.
    // Any template can be used!
    ($left:expr; and $right:expr) => {
        println!("{:?} and {:?} is {:?}",
                 stringify!($left),
                 stringify!($right),
                 $left && $right)
    };
    // ^ each arm must end with a semicolon.
    ($left:expr; or $right:expr) => {
        println!("{:?} or {:?} is {:?}",
                 stringify!($left),
                 stringify!($right),
                 $left || $right)
    };
}

    macro_rules! less_than {
    ($exp1:expr, $exp2:expr) => {
        if !($exp1 < $exp2) {
            println!("[assert error] less_than! => {} is not less than {}", $exp1, $exp2);
        }
    };
}

    pub fn test() {
        println!(">>>>> macro overload");
        test!(1i32 + 1 == 2i32; and 2i32 * 2 == 4i32);
        test!(true; or false);

        less_than!(1, 2);
        less_than!(2, 1);

        println!();
    }
}

mod repeat {
    use std::cmp::min;

    macro_rules! min {
        ($x:expr) => ($x);
        ($x:expr, $($y:expr), +) => {
            min($x, min!($($y), +))
        }
    }

    pub fn test() {
        println!(">>>>> macro repeat");
        println!("min val = {}", min!(1));
        println!("min val = {}", min!(1, 3));
        println!("min val = {}", min!(1, 3, 5));
        println!("min val = {}", min!(1, 3, 5, 7));
    }
}

mod dry {
    use std::ops::{Add, Mul, Sub};

    macro_rules! assert_equal_len {
        // The `tt` (token tree) designator is used for
        // operators and tokens.
        ($a:expr, $b:expr, $func:ident, $op:tt) => {
            assert!($a.len() == $b.len(),
                    "{:?}: dimension mismatch: {:?} {:?} {:?}",
                    stringify!($func),
                    ($a.len(),),
                    stringify!($op),
                    ($b.len(),));
        };
    }

    #[allow(unused)]
    macro_rules! op {
        ($func:ident, $bound:ident, $op:tt, $method:ident) => {
            #[allow(dead_code)]
            fn $func<T: $bound<T, Output=T> + Copy>(xs: &mut Vec<T>, ys: &Vec<T>) {
                assert_equal_len!(xs, ys, $func, $op);

                for (x, y) in xs.iter_mut().zip(ys.iter()) {
                    *x = $bound::$method(*x, *y);
                    // *x = x.$method(*y);
                }
            }
        };
    }

    // Implement `add_assign`, `mul_assign`, and `sub_assign` functions.
    op!(add_assign, Add, +=, add);
    op!(mul_assign, Mul, *=, mul);
    op!(sub_assign, Sub, -=, sub);

    pub mod test {
        macro_rules! test {
            ($func:ident, $x:expr, $y:expr, $z:expr) => {
                #[test]
                fn $func() {
                    for size in 0usize..10 {
                        let mut x: Vec<_> = iter::repeat($x).take(size).collect();
                        let y: Vec<_> = iter::repeat($y).take(size).collect();
                        let z: Vec<_> = iter::repeat($z).take(size).collect();

                        super::$func(&mut x, &y);

                        assert_eq!(x, z);
                    }
                }
            };
        }

        // Test `add_assign`, `mul_assign`, and `sub_assign`.
        test!(add_assign, 1u32, 2u32, 3u32);
        test!(mul_assign, 2u32, 3u32, 6u32);
        test!(sub_assign, 3u32, 2u32, 1u32);
    }
}

mod dsl {
    #[allow(unused)]
    macro_rules! calculate {
        (eval $e:expr) => {{
            {
                let val: usize = $e as usize; // Force types to be integers
                println!("{} = {} (origin)", stringify!{$e}, $e);
                println!("{} = {}", stringify!{$e}, val);
            }
        }};
    }

    #[test]
    fn test() {
        calculate! {
            eval 1 + 2 // hehehe `eval` is _not_ a Rust keyword!
        }

        calculate! {
            eval (1.0 + 2.0) * (3.0 / 4.0)
        }
    }
}

#[allow(unused)]
pub fn test() {
    println!("========== macro test ==========");
    designator::test();
    overload::test();
    repeat::test();
}
