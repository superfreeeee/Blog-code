const object = { a: 1, b: 2, c: 3 }
console.log(Object.getOwnPropertyNames(object))
Object.defineProperty(object, 'c', { enumerable: false })
console.log(Object.getOwnPropertyNames(object))
