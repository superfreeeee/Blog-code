import { log } from '../../utils/console'

export interface ExternalState {
  name: string
}

export interface Flyweight {
  operation(state: ExternalState): void
}

export class ConcreteFlyweight implements Flyweight {
  static count = 0
  id = ConcreteFlyweight.count++

  operation(state: ExternalState) {
    log(
      `ConcreteFlyweight(${this.id}) with state: name=${state.name}`
    )
  }
}

export class UnsharedConcreteFlyweight implements Flyweight {
  static count = 0
  id = UnsharedConcreteFlyweight.count++

  operation(state: ExternalState) {
    log(
      `UnsharedConcreteFlyweight(${this.id}) with state: name=${state.name}`
    )
  }
}
