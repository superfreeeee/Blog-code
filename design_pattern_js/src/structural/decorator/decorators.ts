import { log } from '../../utils/console'
import { Component } from './components'

export abstract class Decorator implements Component {
  component: Component

  constructor(component: Component) {
    this.component = component
  }

  abstract operation(): void
}

export class ConcreteDecorator extends Decorator {
  constructor(component: Component) {
    super(component)
  }

  operation() {
    log('invoke operation in ConcreteDecorator')
    this.component.operation()
  }
}
