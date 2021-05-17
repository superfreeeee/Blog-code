let uid = 0

function MyClass() {
  this.id = uid++
}

console.group(`Reflect.ownKeys(MyClass)`, Reflect.ownKeys(MyClass))
for (const key of Reflect.ownKeys(MyClass)) {
  console.log(`MyClass.${key} = `, MyClass[key])
}
console.groupEnd()

console.group('MyClass test')
console.log(
  `MyClass.prototype.constructor === MyClass: ${
    MyClass.prototype.constructor === MyClass
  }`
)
console.log(
  `MyClass.prototype.__proto__ === Object.prototype: ${
    MyClass.prototype.__proto__ === Object.prototype
  }`
)
console.groupEnd()

const c1 = new MyClass()

const c2 = {}
MyClass.call(c2)

const c3 = Object.create(MyClass.prototype)

const c4 = Object.create(null)
MyClass.call(c4)

console.group('MyClass create')
console.log(`c1 = new MyClass()`, c1)
console.log(`c2 = MyClass.call({})`, c2)
console.log(`c3 = Object.create(MyClass.prototype)`, c3)
console.log(`c4 = MyClass.call(Object.create(null))`, c4)

console.log(
  `c1.__proto__ === MyClass.prototype: ${c1.__proto__ === MyClass.prototype}`
)
console.log(
  `c2.__proto__ === Object.prototype: ${c2.__proto__ === Object.prototype}`
)
console.log(
  `c3.__proto__ === MyClass.prototype: ${c3.__proto__ === MyClass.prototype}`
)
console.log(`c4.__proto__ === undefined: ${c4.__proto__ === undefined}`)
console.groupEnd()
