import { log } from '../../utils/console'
import { Implementor } from './implementors'

export abstract class Abstraction {
  impl: Implementor

  constructor(impl: Implementor) {
    this.impl = impl
  }

  abstract operation(): void
}

export class RefinedAbstraction extends Abstraction {
  operation() {
    log('invoke operation by RefinedAbstraction')
    this.impl.operationImpl()
  }
}
