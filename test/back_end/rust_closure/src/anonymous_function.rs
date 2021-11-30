extern crate rand;

use std::thread;
use std::time::Duration;
use std::ops::Fn;
use rand::random;

struct FnCache<T> where T: Fn(u32) -> u32 {
    calculation: T,
    value: Option<u32>,
}

impl<T> FnCache<T> where T: Fn(u32) -> u32 {
    fn new(calculation: T) -> FnCache<T> {
        FnCache {
            calculation,
            value: None,
        }
    }

    fn value(&mut self, arg: u32) -> u32 {
        match self.value {
            Some(value) => value,
            None => {
                let value = (self.calculation)(arg);
                self.value = Some(value);
                value
            }
        }
    }
}

fn generate_task(intensity: u32) -> bool {
    let mut expensive_closure = FnCache::new(|num| {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        println!("done!");
        num
    });

    if intensity < 20 {
        println!("intensity = {}, keep working", expensive_closure.value(intensity));
        false
    } else {
        println!("intensity = {}, enough", intensity);
        true
    }
}

fn simple_fn(x: u32) -> u32 {
    println!("simple_fn({})", x);
    x
}

pub fn test() {
    println!(">>>>> anonymous_function");

    let mut count = 1;
    loop {
        let i: u32 = random();
        let random_intensity = i % 30;
        let done = generate_task(random_intensity);
        if done || count >= 3 {
            break;
        }
        count += 1;
    }

    println!("\n! test normal function as Fn");
    let mut cache = FnCache::new(simple_fn);
    println!("cache.value(1) = {}", cache.value(1));
    println!("cache.value(2) = {}", cache.value(2));

    println!();
}