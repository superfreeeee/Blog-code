export interface Product {
  clone: () => Product
}

export class ProductA implements Product {
  static count: number = 0
  origin: number
  id: number

  constructor(proto: ProductA | void) {
    this.origin = proto ? proto.id : -1
    this.id = ProductA.count++
  }

  clone() {
    return new ProductA(this)
  }
}

export class ProductB extends ProductA {
  static count: number = 0
  origin: number
  id: number

  constructor(proto: ProductB | void) {
    super()
    this.origin = proto ? proto.id : -1
    this.id = ProductB.count++
  }

  clone() {
    return new ProductB(this)
  }
}

export class ProductC implements Product {
  static count: number = 0
  origin: number
  id: number

  constructor(proto: ProductC | void) {
    this.origin = proto ? proto.id : -1
    this.id = ProductC.count++
  }

  clone() {
    return new ProductC(this)
  }
}
