import { log } from '../../utils/console'
import { Builder, ConcreteBuilder } from './builder'
import {
  ComponentA,
  ComponentB,
  ComponentC,
  Product,
} from './products'

class Director {
  buildProductInOrder(builder: Builder): Product {
    return builder
      .setComponentA(new ComponentA())
      .setComponentB(new ComponentB())
      .setComponentC(new ComponentC())
      .build()
  }

  buildProductBackward(builder: Builder): Product {
    return builder
      .setComponentC(new ComponentA())
      .setComponentB(new ComponentB())
      .setComponentA(new ComponentC())
      .build()
  }
}

const director = new Director()
const productInOrder = director.buildProductInOrder(new ConcreteBuilder())
log('productInOrder:', productInOrder)
const productBackward = director.buildProductBackward(new ConcreteBuilder())
log('productBackward:', productBackward)
