import { log } from '../../utils/console'
import Context from './Context'
import { Capitalize, LowerCase, UpperCase } from './strategys'

const upperCase = new UpperCase()
const lowerCase = new LowerCase()
const capitalize = new Capitalize()

const context = new Context()
log(`context: ${context}`)

context.setStrategy(upperCase)
log(`context: ${context}`)

context.setStrategy(lowerCase)
log(`context: ${context}`)

context.setStrategy(capitalize)
log(`context: ${context}`)
