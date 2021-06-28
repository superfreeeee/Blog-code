import { group, log } from '../../utils/console'
import Context from './Context'
import { BinaryExpression, TerminalToken } from './expressions'

function createBinaryExpression(s: string) {
  const [num1, sign, num2] = s.split(' ')
  const x = new TerminalToken(Number(num1))
  const y = new TerminalToken(Number(num2))
  const be = new BinaryExpression(x, y, sign)
  return be
}

group('interpret expression1', () => {
  const context = new Context()
  const expression1 = createBinaryExpression('1 + 1')
  expression1.interpret(context)
  log('context:', context)
})

group('interpret expression2', () => {
  const context = new Context()
  const expression2 = createBinaryExpression('123 + 456')
  expression2.interpret(context)
  log('context:', context)
})
