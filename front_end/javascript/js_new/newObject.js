function newObject(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype)
  const ret = Ctor.apply(obj, args)
  return ret instanceof Object ? ret : obj
}

let uid = 0

function MyClass() {
  this.id = uid++
}

const c1 = new MyClass()
const c2 = newObject(MyClass)
console.log(`c1 = new MyClass()`, c1)
console.log(`c2 = newObject(MyClass)`, c2)

console.log(
  `c1.__proto__ === MyClass.prototype: ${c1.__proto__ === MyClass.prototype}`
)
console.log(
  `c2.__proto__ === MyClass.prototype: ${c2.__proto__ === MyClass.prototype}`
)
