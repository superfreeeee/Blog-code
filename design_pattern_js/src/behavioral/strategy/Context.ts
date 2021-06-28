import { Default, Strategy } from './strategys'

export default class Context {
  name = 'sUpErFrEe'
  strategy: Strategy = new Default()

  setStrategy(strategy: Strategy) {
    this.strategy = strategy
  }

  toString() {
    return `{ name: ${this.strategy.operation(this.name)} }`
  }
}
