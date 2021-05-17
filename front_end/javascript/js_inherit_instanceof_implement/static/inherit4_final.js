function SuperClass() {
  this.name = 'I am super class'
}

SuperClass.prototype.greeting = function () {
  console.log('super class prototype greeting')
}

function SubClass() {}

SubClass.prototype = Object.create(SuperClass.prototype)
SubClass.prototype.constructor = SubClass

const sub = new SubClass()

console.log('sub', sub)
console.log(`sub.constructor === SubClass: ${sub.constructor === SubClass}`)
console.log(
  `sub.__proto__ === SubClass.prototype: ${
    sub.__proto__ === SubClass.prototype
  }`
)
console.log(
  `sub.__proto__.__proto__ === SuperClass.prototype: ${
    sub.__proto__.__proto__ === SuperClass.prototype
  }`
)
