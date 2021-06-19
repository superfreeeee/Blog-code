import { log } from '../../utils/console'
import { Product, ProductA, ProductB, ProductC } from './products'

const products = new Map<string, Product>()
products.set('a', new ProductA())
products.set('b', new ProductB())
products.set('c', new ProductC())

log('products:', products)

const productA = products.get('a')?.clone()
log('productA:', productA)

const productB = products.get('b')?.clone()
log('productB:', productB)

const productC = products.get('c')?.clone()
log('productC:', productC)
