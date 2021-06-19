import { Factory, Factory1, Factory2 } from './factorys'

const factory1: Factory = new Factory1()

const productA1 = factory1.createProductA()
const productB1 = factory1.createProductB()

console.log('productA1:', productA1)
console.log('productB1:', productB1)

const factory2: Factory = new Factory2()

const productA2 = factory2.createProductA()
const productB2 = factory2.createProductB()

console.log('productA2:', productA2)
console.log('productB2:', productB2)
