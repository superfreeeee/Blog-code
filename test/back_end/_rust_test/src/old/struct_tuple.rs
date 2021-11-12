#[derive(Debug)]
struct Person {
    id: u32,
    name: String,
    nation: String,
}

pub fn test_struct_and_tuple() {
    println!("----- test_struct_and_tuple -----");

    // struct instance
    println!("<<< struct instance >>>");
    let p = Person {
        id: 1,
        name: String::from("person1"),
        nation: String::from("China"),
    };
    println!("p = {:?}", p);
    println!("p = {:#?}", p);

    // struct init simplify
    println!("<<< struct init simplify >>>");
    let id: u32 = 2;
    let name = String::from("user2");
    let nation = String::from("USA");
    let p = Person {
        id,
        name,
        nation,
    };
    println!("p = {:#?}", p);

    // struct partly overwrite
    println!("<<< struct partly overwrite >>>");
    let p = Person {
        id: 3,
        ..p
    };
    println!("p = {:#?}", p);

    // tuple struct
    println!("<<< tuple struct >>>");
    #[derive(Debug)]
    struct Color(u8, u8, u8); // rgb
    #[derive(Debug)]
    struct Point2D(f64, f64); // x, y
    let black: Color = Color(0, 0, 0);
    let p = Point2D(0.0, 0.0);
    println!("black = {:?}", black);
    println!("p = {:?}", p);

    // struct method
    impl Person {
        fn info(&self) -> String {
            let mut s = String::from("A person = ");
            s.push_str("I am ");
            s.push_str(self.name.as_str());
            s.push_str(", with id = ");
            s.push_str(self.id.to_string().as_str());
            return s;
        }
    }
    let p = Person {
        id: 1,
        name: String::from("sample"),
        nation: String::from("Japan"),
    };
    println!("p.info(): {}", p.info());

    impl Person {
        fn from(id: u32, name: String, nation: String) -> Person {
            Person { id, name, nation }
        }
    }
    let p = Person::from(2, String::from("sample2"), String::from("China"));
    println!("p = {:?}", p);
    println!("{}", p.info());
}