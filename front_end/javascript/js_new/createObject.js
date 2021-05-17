const obj1 = {}
const obj2 = Object()
const obj3 = new Object()
const obj4 = Object.create({})
const obj5 = Object.create(null)

console.log('obj1 = {}', obj1)
console.log('obj2 = Object()', obj2)
console.log('obj3 = new Object()', obj3)
console.log('obj4 = Object.create()', obj4)
console.log('obj5 = Object.create(null)', obj5)

console.log(
  `obj1.__proto__ === Object.prototype: ${obj1.__proto__ === Object.prototype}`
)
console.log(
  `obj2.__proto__ === Object.prototype: ${obj2.__proto__ === Object.prototype}`
)
console.log(
  `obj3.__proto__ === Object.prototype: ${obj3.__proto__ === Object.prototype}`
)
console.log(
  `obj4.__proto__.__proto__ === Object.prototype: ${
    obj4.__proto__.__proto__ === Object.prototype
  }`
)
console.log(`obj5.__proto__ === undefined: ${obj5.__proto__ === undefined}`)
