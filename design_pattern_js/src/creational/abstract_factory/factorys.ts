import {
  ProductA,
  ProductA1,
  ProductA2,
  ProductB,
  ProductB1,
  ProductB2,
} from './products'

export interface Factory {
  createProductA(): ProductA
  createProductB(): ProductB
}

export class Factory1 implements Factory {
  createProductA() {
    return new ProductA1()
  }

  createProductB() {
    return new ProductB1()
  }
}

export class Factory2 implements Factory {
  createProductA() {
    return new ProductA2()
  }

  createProductB() {
    return new ProductB2()
  }
}
