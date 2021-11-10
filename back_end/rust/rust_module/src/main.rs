mod mod_a {
    pub fn f() {
        println!("invoke f in mod_a");
        g();
    }

    fn g() {
        println!("invoke g in mod_a");
    }
}

mod mod_b;
mod mod_c;

fn main() {
    println!("Hello, world!");
    use mod_c::mod_d;

    mod_a::f();
    mod_b::f();
    mod_c::f();
    mod_c::mod_d::f();
    mod_d::f();
}
