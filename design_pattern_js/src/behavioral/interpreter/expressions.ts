import { log } from '../../utils/console'
import Context from './Context'

function record(msg: string, context: Context) {
  context.log.push(msg)
  log(`meet ${msg}`)
}

export interface Expression {
  interpret(context: Context): void
}

export class TerminalToken implements Expression {
  num: number

  constructor(num: number) {
    this.num = num
  }

  interpret(context: Context): void {
    record(`token(${this.num})`, context)
  }
}

export class BinaryExpression implements Expression {
  x: TerminalToken
  y: TerminalToken
  sign: string

  constructor(x: TerminalToken, y: TerminalToken, sign: string) {
    this.x = x
    this.y = y
    this.sign = sign
  }

  interpret(context: Context) {
    const exp = `${this.x.num} ${this.sign} ${this.y.num}`
    const msg = `binaryExpression(${exp})`
    record(msg, context)

    this.x.interpret(context)
    log(`sign ${this.sign}`)
    this.y.interpret(context)
  }
}
