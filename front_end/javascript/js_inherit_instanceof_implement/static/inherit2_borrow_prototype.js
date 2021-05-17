function SuperClass() {
  this.name = 'I am super class'
}

SuperClass.prototype.greeting = function () {
  console.log('super class prototype greeting')
}

function SubClass() {}

SubClass.prototype = SuperClass.prototype

const sub = new SubClass()

console.log('sub', sub)
console.log(`sub.constructor === SuperClass: ${sub.constructor === SuperClass}`)
console.log(
  `sub.__proto__ === SubClass.prototype: ${
    sub.__proto__ === SubClass.prototype
  }`
)
console.log(
  `sub.__proto__ === SuperClass.prototype: ${
    sub.__proto__ === SuperClass.prototype
  }`
)
