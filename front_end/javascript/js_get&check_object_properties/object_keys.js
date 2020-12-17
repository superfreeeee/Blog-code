const object = { a: 1, b: 2, c: 3 }
console.log(Object.keys(object))
Object.defineProperty(object, 'c', { enumerable: false })
console.log(Object.keys(object))
