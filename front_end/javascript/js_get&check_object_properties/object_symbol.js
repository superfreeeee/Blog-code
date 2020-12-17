const symbolA = Symbol('a')
const object = { a: 1, b: 2, c: 3, [symbolA]: 4 }
console.log(object)
console.log(Object.getOwnPropertyNames(object))
