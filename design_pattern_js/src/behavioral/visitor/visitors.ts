import { log } from '../../utils/console'
import { ElementA, ElementB } from './elements'

export abstract class Visitor {
  visitElementA(_: ElementA) {}
  visitElementB(_: ElementB) {}
}

export class ConcreteVisitorA extends Visitor {
  visitElementA(elementA: ElementA) {
    log('ConcreteVisitorA visit', elementA)
  }
}

export class ConcreteVisitorB extends Visitor {
  visitElementB(elementB: ElementB) {
    log('ConcreteVisitorB visit', elementB)
  }
}
