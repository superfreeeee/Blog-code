// function f() {

// }

// function ff() {

// }

// console.log(f.prototype)
// console.log(f.__proto__ === Function.prototype)
// console.log(f.prototype.__proto__ === Object.prototype)

// ff.prototype = new f()
// console.log(ff.prototype.__proto__ === f.prototype)
// console.log(ff.constructor === Function)

// const o1 = { name: 'John', age: 18 }
// const o2 = new Object()
// const o3 = new Object(null)
// const o4 = new Object({name: 'John', age: 18})
// const o5 = new Object(o1)
// console.log(o1)
// console.log(o2)
// console.log(o3)
// console.log(o4)
// console.log(o5)
// console.log(o5 === o1)
// o1.name = 123
// console.log(o1)
// console.log(o5)ddd

// function Person(name) {
//   this.name = name
// }
// Person.prototype.hi = function() {
//   console.log(`Hi! I am ${this.name}`)
// }
// const p1 = new Person('John')
// const p2 = new Person('Andy')
// p1.hi()
// p2.hi()

// const a = []
// console.log(a.__proto__ === Array.prototype)
// console.log(Array.prototype.__proto__ === Object.prototype)

// "use strict";

// function SuperClass() {
//   this.name = 'super class'
// }

// SuperClass.prototype.hi = function() {
//   console.log(this.name)
// }

// function SubClass() {
//   this.name = 'sub class'
// }

// SubClass.prototype = Object.create(SuperClass.prototype)
// SubClass.prototype.constructor = SubClass
// SubClass.__proto__ = SuperClass

// const sub = new SubClass()
// sub.hi()
// "use strict";

// function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

// const SuperClass = function () {
//   function SuperClass() {
//     this.name = 'super class';
//   }

//   const _proto = SuperClass.prototype;

//   _proto.hi = function hi() {
//     console.log(this.name);
//   };

//   return SuperClass;
// }();

// const SubClass = function (_SuperClass) {
//   _inheritsLoose(SubClass, _SuperClass);

//   function SubClass() {
//     let _this;

//     _this = _SuperClass.call(this) || this;
//     _this.name = 'sub class';
//     return _this;
//   }

//   return SubClass;
// }(SuperClass);

// const sub = new SubClass();
// sub.hi();

// console.log(Boolean.prototype.__proto__ === Object.prototype)
// console.log(Number.prototype.__proto__ === Object.prototype)
// console.log(Array.prototype.__proto__ === Object.prototype)
// console.log(RegExp.prototype.__proto__ === Object.prototype)
// console.log(Function.prototype.__proto__ === Object.prototype)
// console.log(Object.prototype.__proto__ === null)

// console.log()

// console.log(Boolean.__proto__ === Function.prototype)
// console.log(Number.__proto__ === Function.prototype)
// console.log(Array.__proto__ === Function.prototype)
// console.log(RegExp.__proto__ === Function.prototype)
// console.log(Function.__proto__ === Function.prototype)

// console.log(Object.__proto__ === Function.prototype)

class A {
  constructor() {
    this.a = 'a'
  }

  showDetail() {
    console.log(`this.a = ${this.a}`)
  }
}

class B extends A {
  constructor() {
    super()
    this.b = 'b'
  }

  showDetail() {
    super.showDetail()
    console.log(`this.b = ${this.b}`)
  }
}

class C extends B {
  constructor() {
    super()
    this.a = 'ca'
    this.b = 'cb'
  }

  showDetail() {
    super.showDetail()
  }
}

const a = new A()
const b = new B()
const c = new C()
console.log('invoke a.show')
a.showDetail()
console.log('invoke b.show')
b.showDetail()
console.log('invoke c.show')
c.showDetail()
