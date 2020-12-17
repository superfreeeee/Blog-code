const nums = [ -1, -2, -3 ]
console.log('----- check nums -----')
console.log(getOwnProperties(nums))
console.log(`nums.hasOwnProperty(0): ${nums.hasOwnProperty(0)}`)
console.log(`nums.hasOwnProperty(1): ${nums.hasOwnProperty(1)}`)
console.log(`nums.hasOwnProperty(2): ${nums.hasOwnProperty(2)}`)
console.log(`nums.hasOwnProperty(3): ${nums.hasOwnProperty(3)}`)
console.log(`nums.hasOwnProperty(-1): ${nums.hasOwnProperty(-1)}`)
console.log(`nums.hasOwnProperty('length'): ${nums.hasOwnProperty('length')}`)
console.log(`nums.hasOwnProperty('toString'): ${nums.hasOwnProperty('toString')}`)

const sa = Symbol('a')
const sb = Symbol('b')
const object = { a: 1, b: 2, [sa]: 3, [sb]: 4 }
Object.defineProperty(object, 'b', { enumerable: false })
Object.defineProperty(object, sb, { enumerable: false })
console.log('----- check object -----')
console.log(getOwnProperties(object))
console.log(getOwnEnumerableProperties(object))
console.log(`object.hasOwnProperty('a'): ${object.hasOwnProperty('a')}`)
console.log(`object.hasOwnProperty('b'): ${object.hasOwnProperty('b')}`)
console.log(`object.hasOwnProperty(sa): ${object.hasOwnProperty(sa)}`)
console.log(`object.hasOwnProperty(sb): ${object.hasOwnProperty(sb)}`)
console.log(`object.hasOwnProperty('toString'): ${object.hasOwnProperty('toString')}`)



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