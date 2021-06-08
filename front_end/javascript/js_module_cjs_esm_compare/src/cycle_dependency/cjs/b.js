import { log } from '../../utils'
const { a } = require('./a')

log('load b.js')

log(`a = ${a}`)

let b = 2

exports.b = b
