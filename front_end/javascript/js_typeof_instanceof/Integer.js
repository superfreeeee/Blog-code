function Integer (num) {
  this.value = Math.floor(num)
}

Integer.prototype = new Number()

Integer.prototype.add = function (num) {
  if (typeof num === 'number') {
      num = Math.floor(num)
      this.value = this.value + num
  } else if (num instanceof Integer) {
    this.value = this.value + num.value
  } else {
    throw new TypeError('expect number or Integer for function add')
  }
  console.log(`add ${num} => ${this.value}`)
  return this
}

Integer.prototype.sub = function (num) {
  if (typeof num === 'number') {
      num = Math.floor(num)
      this.value = this.value - num
  } else if (num instanceof Integer) {
    this.value = this.value - num.value
  } else {
    throw new TypeError('expect number or Integer for function sub')
  }
  console.log(`sub ${num} => ${this.value}`)
  return this
}

Integer.prototype.mul = function (num) {
  if (typeof num === 'number') {
      num = Math.floor(num)
      this.value = this.value * num
  } else if (num instanceof Integer) {
    this.value = this.value * num.value
  } else {
    throw new TypeError('expect number or Integer for function mul')
  }
  console.log(`mul ${num} => ${this.value}`)
  return this
}

Integer.prototype.div = function (num) {
  if (typeof num === 'number') {
    num = Math.floor(num)
    this.value = Math.floor(this.value / num)
  } else if (num instanceof Integer) {
    this.value = Math.floor(this.value / num.value)
  } else {
    throw new TypeError('expect number or Integer for function div')
  }
  console.log(`div ${num} => ${this.value}`)
  return this
}

Integer.prototype.toString = function () {
  return this.value
}

const i = new Integer(1)
console.log(`i = ${i}`)
console.log(`i instanceof Integer: ${i instanceof Integer}`)
console.log(`i instanceof Number: ${i instanceof Number}`)
i.add(15).sub(new Integer(4)).mul(5).div(new Integer(13.579))