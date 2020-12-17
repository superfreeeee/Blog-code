function Integer (num) {
  this.value = Math.floor(num)
}

Integer.prototype = new Number()

Integer.prototype.binary_operation = function (name, calc) {
  return (num) => {
    if (typeof num === 'number') {
      num = Math.floor(num)
      this.value = Math.floor(calc(this.value, num))
    } else if (num instanceof Integer) {
      this.value = Math.floor(calc(this.value, num.value))
    } else {
      throw new TypeError('expect number or Integer for function add')
    }
    console.log(`${name} ${num} => ${this.value}`)
    return this
  }
}
Integer.prototype.add = function (num) { return this.binary_operation('add', (x, y) => x + y)(num) }
Integer.prototype.sub = function (num) { return this.binary_operation('sub', (x, y) => x - y)(num) }
Integer.prototype.mul = function (num) { return this.binary_operation('mul', (x, y) => x * y)(num) }
Integer.prototype.div = function (num) { return this.binary_operation('div', (x, y) => x / y)(num) }

Integer.prototype.toString = function () {
  return this.value
}

const i = new Integer(1)
console.log(`i = ${i}`)
console.log(`i instanceof Integer: ${i instanceof Integer}`)
console.log(`i instanceof Number: ${i instanceof Number}`)
i.add(15).sub(new Integer(4)).mul(5).div(new Integer(13.579))