const nums = [ -1, -2, -3 ]
console.log('----- check nums -----')
console.log(getOwnProperties(nums))
console.log(`0 in nums: ${0 in nums}`)
console.log(`1 in nums: ${1 in nums}`)
console.log(`2 in nums: ${2 in nums}`)
console.log(`3 in nums: ${3 in nums}`)
console.log(`-1 in nums: ${-1 in nums}`)
console.log(`'length' in nums: ${'length' in nums}`)
console.log(`'toString' in nums: ${'toString' in nums}`)

const sa = Symbol('a')
const sb = Symbol('b')
const object = { a: 1, b: 2, [sa]: 3, [sb]: 4 }
Object.defineProperty(object, 'b', { enumerable: false })
Object.defineProperty(object, sb, { enumerable: false })
console.log('----- check object -----')
console.log(getOwnProperties(object))
console.log(getOwnEnumerableProperties(object))
console.log(`'a' in object: ${'a' in object}`)
console.log(`'b' in object: ${'b' in object}`)
console.log(`sa in object: ${sa in object}`)
console.log(`sb in object: ${sb in object}`)
console.log(`'toString' in object: ${'toString' in object}`)



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