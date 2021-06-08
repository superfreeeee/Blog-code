import { log } from '../../utils'
import { a } from './a'

log('load b.js')

log(`a = ${a}`)

let b = 2

export { b }
