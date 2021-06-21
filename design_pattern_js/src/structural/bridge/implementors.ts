import { log } from '../../utils/console'

export interface Implementor {
  operationImpl(): void
}

export class ImplementorA implements Implementor {
  operationImpl() {
    log('invoke operationImpl by ImplementorA')
  }
}

export class ImplementorB implements Implementor {
  operationImpl() {
    log('invoke operationImpl by ImplementorB')
  }
}
