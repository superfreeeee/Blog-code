let uid = 0

function MyClass(index = 0) {
  this.id = uid++
  // return primitive
  return [0, false, 'string', {}, [], null, undefined, function () {}][index]
}

const c0 = new MyClass(0)
const c1 = new MyClass(1)
const c2 = new MyClass(2)
const c3 = new MyClass(3)
const c4 = new MyClass(4)
const c5 = new MyClass(5)
const c6 = new MyClass(6)
const c7 = new MyClass(7)

console.log(`return 0: `, c0)
console.log(`return false: `, c1)
console.log(`return 'string': `, c2)
console.log(`return {}: `, c3)
console.log(`return []: `, c4)
console.log(`return null: `, c5)
console.log(`return undefined: `, c6)
console.log(`return function() {}: `, c7)
