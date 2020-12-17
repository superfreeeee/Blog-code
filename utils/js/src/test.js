import validators from './utils/validators/index.js'

const [func = 'None', ...args] = process.argv.slice(2)

console.log(`test: ${func}, args: ${args}`)
console.log(validators)
// for (let arg of args) {
//   console.log(`test: ${arg}, result: ${validatePhone(arg)}`)
// }

