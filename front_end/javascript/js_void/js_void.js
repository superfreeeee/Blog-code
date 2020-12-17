// const a = void function hi(val) {
//   console.log(val)
// }(123)

// console.log(`a = ${a}`)

// let i = 0
// const f = () => void i++
// console.log(i)
// let j = f()
// console.log(i)
// console.log(j)

let o = {}
const f = name => o.name = name
let o2 = f('amy')
console.log(o)
console.log(o2)