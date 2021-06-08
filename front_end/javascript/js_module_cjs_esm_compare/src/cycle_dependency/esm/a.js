import { log } from '../../utils'
import { b } from './b'

log('load a.js')

log(`b = ${b}`)

let a = 1

export { a }
