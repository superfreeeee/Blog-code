// let o = {
//   name: 'john'
// }

// let obj = {
//   [o]: 123
// }

// console.log(obj)

// let map = new Map();
// map.set(o, 123)
// console.log(map)
// let ov = map.get(o)
// console.log(ov)

// let s = new Set([null, undefined, {}])
// console.log({} === {})
// console.log({} == {})
// console.log(null == null)
// console.log(null === null)
// console.log(undefined == undefined)
// console.log(undefined === undefined)
// console.log(null == undefined)
// console.log(null === undefined)
// console.log(s)

// let s1 = new Set([1, 2, 3, 2, 1])
// console.log(s1)

// let s2 = new Set()
// ;[1, 2, 3, 2, 1].map((x) => s2.add(x))
// console.log(s2)

// console.log(NaN === NaN)

// let array = [1,2,3,2,1]
// console.log(array)
// let array2 = [...new Set(array)]
// console.log(array2)
// let s = new Set([NaN, NaN])
// console.log(s)

// let s = new Set([1, 2, 3, 2, 1])

// s.add(6)
// console.log(s)

// s.has(6)
// s.has(8)
// console.log(s)

// s.delete(6)
// s.delete(8)
// console.log(s)

// s.clear()
// console.log(s)

// let s = new Set([1, 2, 3, 2, 1])
// let a = Array.from(s)
// let a2 = [...s]
// console.log(a)
// console.log(a2)
// console.log(a === a2)

// let s = new Set(['red', 'blue', 'green'])
// for(let value of s) {
//   console.log(value)
// }
// Set.prototype.values === Set.prototype[Symbol.iterator]
// for(let key of s.keys()) {
//   console.log(key)
// }
// for(let val of s.values()) {
//   console.log(val)
// }
// for(let [key, val] of s.entries()) {
//   console.log(key, val)
// }
// s.forEach((v1, v2, s) => {
//   console.log(v1)
//   console.log(v2)
//   console.log(s)
// })
// let a = new Set([1,2,3])
// let b = new Set([5,4,3])

// // union
// let union = new Set([...a, ...b])
// let intersect = new Set([...a].filter(x => b.has(x)))
// let difference = new Set([...a].filter(x => !b.has(x)))
// console.log(a)
// console.log(b)
// console.log(union)
// console.log(intersect)
// console.log(difference)

// let a = [1,2,3,4]
// let ws = new WeakSet([[3,4], [1,2]])
// let ws2 = new WeakSet([{0:1}, {1:2}])
// console.log(ws)
// console.log(ws2)

// let key = { name: 'John' }
// let value = { age: 18 }
// let obj = {
//   [key]: value
// }
// console.log(obj)
// let map = new Map()
// map.set(key, value)
// console.log(map)

// let key = { name: 'key' }
// let value = { name: 'value' }
// let map = new Map([
//   [1,2],
//   [key, value]
// ])
// console.log(map)

// console.log()

// let key1 = { name: 'key1' }
// let value1 = { name: 'value1' }
// let key2 = [1,2,3]
// let value2 = [1,2,3]

// let map = new Map()

// map.set(key1, value1)
//   .set(key2, value2)
//   .set(1, 2)
//   .set(true, false)

// console.log(map)

// for(let item of map) {
//   console.log(item)
// }
// Map.prototype.values === Map.prototype[Symbol.iterator]
// // map = Map {
// //   { name: 'key1' } => { name: 'value1' },
// //   [ 1, 2, 3 ] => [ 1, 2, 3 ],
// //   1 => 2,
// //   true => false
// // }

// map.get(key1) // { name: 'value1' }
// map.get(true) // false

// map.has(key1) // true
// map.has({ name: 'key1' }) // false

// map.delete(key2) // true
// map.delete([ 1, 2, 3 ]) // false

// map.clear()
// console.log(map)

// function mapToObject(map) {
//   let obj = {}
//   for(let [key, value] of map) {
//     obj[key] = value
//   }
//   return obj
// }

// let map = new Map([
//   [{ name: 'key1' }, { name: 'value1' }],
//   [true, false],
//   [1, 2]
// ])
// console.log(map)
// let obj = mapToObject(map)
// console.log(obj)

// function objectToMap(obj) {
//   let map = new Map()
//   for(let key in obj) {
//     map.set(key, obj[key])
//   }
//   return map
// }
// map = objectToMap(obj)
// console.log(map)

// let array = [...map]
// console.log(array)
// map = new Map(array)
// console.log(map)

// let map = new Map([
//   ['key1', 1],
//   ['key2', { value: 2 }]
// ])
// function mapToObject(map) {
//   let obj = {}
//   for (let [key, value] of map) {
//     obj[key] = value // 風險操作，key 為對象時轉為可能重複
//   }
//   return obj
// }
// function mapToJSON(map) {
//   return JSON.stringify(mapToObject(map))
// }
// let obj = mapToJSON(map)

// console.log(map)
// console.log(obj)

// let map = new Map([
//   [{ name: 'key1' }, 1],
//   [{ value: 'key2' }, { value: 2 }]
// ])
// function mapToArrJSON(map) {
//   return JSON.stringify([...map])
// }
// let obj = mapToArrJSON(map)
// console.log(obj)

// let objJSON = '{"key1":1,"key2":{"value":2}}'
// function objectToMap(obj) {
//   let map = new Map()
//   for(let key in obj) {
//     map.set(key, obj[key])
//   }
//   return map
// }
// function objJSONToMap(objJSON) {
//   return objectToMap(JSON.parse(objJSON))
// }
// let map = objJSONToMap(objJSON)
// console.log(map)

let arrJSON = '[[{"name":"key1"},1],[{"value":"key2"},{"value":2}]]'
function arrJSONToMap(arrJSON) {
  return new Map(JSON.parse(arrJSON))
}
let map = arrJSONToMap(arrJSON)
console.log(map)