pub fn test_mod() {
    println!("----- test_mod -----");

    // mod access
    println!("<<< mod access >>>");
    outer_mod1::inner_mod1::f();

    // struct in mod
    println!("<<< struct in mod >>>");
    let p = my_structs::Person::from(1, String::from("user1"));
    p.info();

    // enum in mod
    println!("<<< enum in mod >>>");
    fn test(p: my_enums::Person) {
        match p {
            my_enums::Person::King { ref name } => {
                println!("King {}", name);
            }
            my_enums::Person::Queen => {
                println!("Queen");
            }
        }
    }
    let king = my_enums::Person::King { name: String::from("Black") };
    let queen = my_enums::Person::Queen;
    test(king);
    test(queen);

    // keyword use
    println!("<<< keyword: use (use crate::) >>>");
    use layer1::layer2::layer3::f as deep_f;
    use layer1::f as shallow_f;
    use layer1::layer2::layer3 as l3;
    deep_f();
    shallow_f();
    l3::f();

    // use std library
    use std::f64::consts::PI;
    println!("PI = {}", PI);
}

mod outer_mod1 {
    pub mod inner_mod1 {
        mod inner_mod11 {
            pub fn h() {
                println!("invoke h()");
                super::super::inner_mod2::g();
            }
        }

        pub fn f() {
            println!("invoke f()");
            inner_mod11::h();
        }
    }

    mod inner_mod2 {
        pub fn g() {
            println!("invoke g()")
        }
    }
}

mod my_structs {
    #[derive(Debug)]
    pub struct Person {
        // default private
        id: u32,
        name: String,
    }

    impl Person {
        pub fn info(&self) {
            println!("{:#?}", self);
        }

        pub fn from(id: u32, name: String) -> Person {
            Person { id, name }
        }
    }
}

mod my_enums {
    pub enum Person {
        // default pub
        King { name: String },
        Queen,
    }
}

pub mod layer1 {
    pub mod layer2 {
        pub mod layer3 {
            pub fn f() {
                println!("invoke deep f()")
            }
        }
    }

    pub fn f() {
        println!("invoke shallow f()")
    }
}