import { log } from '../../utils/console'
import { Product, ProductA, ProductB } from './products'

export abstract class Creator {
  abstract createProduct(): Product

  operation() {
    const product = this.createProduct()
    log(`product:`, product)
  }
}

export class CreatorA extends Creator {
  createProduct() {
    return new ProductA()
  }
}

export class CreatorB extends Creator {
  createProduct() {
    return new ProductB()
  }
}
