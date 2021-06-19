import { Product, ProductA, ProductB } from './products'

export type ProductCreator = () => Product

export const createProductA: ProductCreator = () => {
  return new ProductA()
}

export const createProductB: ProductCreator = () => {
  return new ProductB()
}
