const nc = Number
const sc = String
const bc = Boolean
const ac = Array
const oc = Object

console.log(nc)
console.log(nc.prototype)
console.log(nc.prototype.__proto__)
console.log(sc)
console.log(sc.prototype)
console.log(sc.prototype.__proto__)
console.log(bc)
console.log(bc.prototype)
console.log(bc.prototype.__proto__)
console.log(ac)
console.log(ac.prototype)
console.log(ac.prototype.__proto__)
console.log(oc)
console.log(oc.prototype)
console.log(oc.prototype.__proto__)

console.log('----- compare -----')
console.log(nc.prototype.__proto__ === sc.prototype.__proto__)
console.log(nc.prototype.__proto__ === bc.prototype.__proto__)
console.log(nc.prototype.__proto__ === ac.prototype.__proto__)
console.log(nc.prototype.__proto__ === oc.prototype)