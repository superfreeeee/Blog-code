type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    // animal: Fish

    return animal.swim();
  }

  // animal: Bird
  return animal.fly();
}
