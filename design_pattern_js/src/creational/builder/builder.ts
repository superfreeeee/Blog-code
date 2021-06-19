import { Component, Product } from './products'

export interface Builder {
  setComponentA: (component: Component) => this
  setComponentB: (component: Component) => this
  setComponentC: (component: Component) => this
  build: () => Product
}

export class ConcreteBuilder implements Builder {
  product: Product = {}

  setComponentA(component: Component) {
    this.product.componentA = component
    return this
  }

  setComponentB(component: Component) {
    this.product.componentB = component
    return this
  }

  setComponentC(component: Component) {
    this.product.componentC = component
    return this
  }

  build() {
    return this.product
  }
}
