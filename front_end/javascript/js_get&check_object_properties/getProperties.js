function getOwnProperties (obj) {
  const keys = Object.getOwnPropertyNames(obj)
  const symbols = Object.getOwnPropertySymbols(obj)
  return [...keys, ...symbols]
}

function getOwnEnumerableProperties (obj) {
  const props = getOwnProperties(obj)
  const enumerableProps = props.filter(prop => Object.getOwnPropertyDescriptor(obj, prop).enumerable)
  return enumerableProps
}

const symbolA = Symbol('a')
const symbolB = Symbol('b')
const object = { a: 1, b: 2, c: 3, [symbolA]: 4, [symbolB]: 5 }
Object.defineProperty(object, 'c', { enumerable: false })
Object.defineProperty(object, symbolB, { enumerable: false })
console.log(getOwnProperties(object))
console.log(getOwnEnumerableProperties(object))

