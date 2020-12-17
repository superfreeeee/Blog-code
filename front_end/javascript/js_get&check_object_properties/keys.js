const symbolA = Symbol('a')
const symbolB = Symbol('b')
const symbolC = Symbol('c')

const object = {
  a: 1,
  b: 2,
  [symbolA]: 'value of key symbolA',
  [symbolB] () {
    console.log('invoke funciton of key symbolB')
  },
  [symbolC]: 'value of key symbolC with enumerable: false'
}
Object.defineProperty(object, 'b', {
  enumerable: false
})
Object.defineProperty(object, symbolC, {
  enumerable: false
})
console.log('----- console.log(object) -----')
console.log(object)

console.log('----- for prop in object -----')
for (let prop in object) {
  console.log(prop)
}

console.log('----- object properties descriptions -----')
console.log(`prop: a`)
console.log(Object.getOwnPropertyDescriptor(object, 'a'))
console.log(`prop: b`)
console.log(Object.getOwnPropertyDescriptor(object, 'b'))
console.log(`prop: ${symbolA.toString()}`)
console.log(Object.getOwnPropertyDescriptor(object, symbolA))
console.log(`prop: ${symbolB.toString()}`)
console.log(Object.getOwnPropertyDescriptor(object, symbolB))
console.log(`prop: ${symbolC.toString()}`)
console.log(Object.getOwnPropertyDescriptor(object, symbolC))
console.log('----- Object.keys -----')
console.log(Object.keys(object))
console.log('----- Object.getOwnPropertyNames -----')
console.log(Object.getOwnPropertyNames(object))
console.log('----- Object.getOwnPropertySymbols -----')
console.log(Object.getOwnPropertySymbols(object))