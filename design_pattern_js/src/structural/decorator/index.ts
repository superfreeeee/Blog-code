import { Component, ConcreteComponent } from './components'
import { ConcreteDecorator, Decorator } from './decorators'

function decorate(component: Component): Decorator {
  return new ConcreteDecorator(component)
}

const component = new ConcreteComponent()
const decoratedComponent = decorate(component)
decoratedComponent.operation()
