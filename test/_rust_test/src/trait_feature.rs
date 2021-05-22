pub fn test_trait() {
    println!("----- test_trait -----");

    // basic trait
    println!("<<< basic trait >>>");
    let p1 = Person { name: String::from("test"), age: 10 };
    println!("{}", p1.desc());

    // trait default function
    println!("<<< trait default function >>>");
    println!("{}", p1.run());

    // trait as param type
    println!("<<< trait as param type >>>");
    print(&p1);

    // trait as generic
    println!("<<< trait as generic >>>");
    print_generic(&p1);

    // generic max with trait Comparable
    println!("<<< generic max with trait Comparable >>>");
    let a = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0];
    println!("max of arr {:?} is {}", a, max(&a));

    // trait as return type (should return same type)
    println!("<<< trait as return type >>>");
    let p = create_runnable(true);
    println!("Runnable: {}", p.run());

    // condition trait
    println!("<<< condition trait >>>");
    let c = C::from(Something {});
    c.c();
}

trait A {
    fn a(&self) {
        println!("function a");
    }
}

trait B {
    fn b(&self) {
        println!("function b");
    }
}

struct Something {}

impl A for Something {}

impl B for Something {}

struct C<T> {
    t: T
}

impl<T> C<T> {
    fn from(t: T) -> C<T> {
        C { t }
    }
}

impl<T: A + B> C<T> {
    fn c(&self) {
        self.t.a();
        self.t.b();
    }
}

fn create_runnable(_type: bool) -> impl Runnable {
    if _type {
        Person { name: String::from("true"), age: 123 }
    } else {
        Person { name: String::from("false"), age: 456 }
    }
}

trait Comparable {
    fn compare(&self, obj: &Self) -> i8;
}

fn max<T: Comparable>(arr: &[T]) -> &T {
    let mut max_index = 0;
    let mut i = 1;
    while i < arr.len() {
        if arr[i].compare(&arr[max_index]) > 0 {
            max_index = i;
        }
        i += 1;
    }
    &arr[max_index]
}

impl Comparable for f64 {
    fn compare(&self, obj: &f64) -> i8 {
        if &self > &obj { 1 } //
        else if &self == &obj { 0 } //
        else { -1 }
    }
}

trait Descriptive {
    fn desc(&self) -> String;
}

struct Person {
    name: String,
    age: u32,
}

impl Descriptive for Person {
    fn desc(&self) -> String {
        format!("{} {}", self.name, self.age)
    }
}

trait Runnable {
    fn run(&self) -> String {
        String::from("runnable object")
    }
}

impl Runnable for Person {}

fn print(obj: &impl Runnable) {
    println!("{}", obj.run());
}

fn print_generic<T: Runnable>(obj: &T) {
    println!("{}", obj.run());
}