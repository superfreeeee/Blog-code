import { group } from '../../utils/console'
import { ConcreteHandlerA, ConcreteHandlerB } from './handlers'

const handlerA = new ConcreteHandlerA()
const handlerB = new ConcreteHandlerB()
const handlerC = new ConcreteHandlerA(new ConcreteHandlerB())

group("handlerA.handleRequest('A')", () => {
  handlerA.handleRequest('A')
})

group("handlerB.handleRequest('A')", () => {
  handlerB.handleRequest('A')
})

group("handlerC.handleRequest('A')", () => {
  handlerC.handleRequest('A')
})

group("handlerA.handleRequest('B')", () => {
  handlerA.handleRequest('B')
})

group("handlerB.handleRequest('B')", () => {
  handlerB.handleRequest('B')
})

group("handlerC.handleRequest('B')", () => {
  handlerC.handleRequest('B')
})
