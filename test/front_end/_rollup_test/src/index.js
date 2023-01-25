class A {
  constructor() {
    const obj = Object.create(A.prototype);
    Object.assign(obj, { a: 123 });
    return obj;
  }

  hello() {
    console.log(`This is A { ${this} }`);
  }
}

const a = A();
a.hello();
