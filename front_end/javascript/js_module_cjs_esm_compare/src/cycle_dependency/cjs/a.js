import { log } from '../../utils'
const { b } = require('./b')

log('load a.js')

log(`b = ${b}`)

let a = 1

exports.a = a
