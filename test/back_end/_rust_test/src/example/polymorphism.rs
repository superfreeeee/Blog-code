struct Sheep;

struct Cow;

trait Animal {
    fn noise(&self) -> &str;
}

impl Animal for Sheep {
    fn noise(&self) -> &str {
        "mie mie"
    }
}

impl Animal for Cow {
    fn noise(&self) -> &str {
        "moooooooo"
    }
}

fn random_animal(seed: bool) -> Box<dyn Animal> {
    if seed {
        Box::new(Sheep)
    } else {
        Box::new(Cow)
    }
}

#[allow(dead_code)]
pub fn test() {
    let sheep = random_animal(true);
    let cow = random_animal(false);
    println!("An animal noise: {}", sheep.noise());
    println!("An animal noise: {}", cow.noise());
}