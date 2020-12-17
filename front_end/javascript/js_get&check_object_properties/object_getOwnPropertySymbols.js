const symbolA = Symbol('a')
const symbolB = Symbol('b')
const object = { a: 1, b: 2, c: 3, [symbolA]: 4, [symbolB]: 5 }
Object.defineProperty(object, 'c', { enumerable: false })
Object.defineProperty(object, symbolB, { enumerable: false })
console.log(object)
console.log(Object.keys(object))
console.log(Object.getOwnPropertyNames(object))
console.log(Object.getOwnPropertySymbols(object))
