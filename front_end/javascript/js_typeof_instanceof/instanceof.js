const n = new Number(1)

console.log(n)
console.log(n.__proto__)
console.log(n.__proto__.__proto__)
console.log(n.__proto__.__proto__.__proto__)

console.log(`1 instanceof Number: ${1 instanceof Number}`)
console.log(`n instanceof Number: ${n instanceof Number}`)

function Integer (num) {
  this.value = Math.floor(num)
}

Integer.prototype = Number.prototype

const i = new Integer(123)
console.log(i)
console.log('----- Integer.prototype = Number.prototype -----')
console.log(`i instanceof Number: ${i instanceof Number}`)
console.log(`i instanceof Integer: ${i instanceof Integer}`)
console.log(`n instanceof Number: ${n instanceof Number}`)
console.log(`n instanceof Integer: ${n instanceof Integer}`)

const IntegerProto = new Number()
Integer.prototype = IntegerProto

const j = new Integer(456)
console.log('----- Integer.prototype = IntegerProto -----')
console.log(`j instanceof Number: ${j instanceof Number}`)
console.log(`j instanceof Integer: ${j instanceof Integer}`)
console.log(`n instanceof Number: ${n instanceof Number}`)
console.log(`n instanceof Integer: ${n instanceof Integer}`)