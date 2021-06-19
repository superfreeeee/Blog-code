import { group, log } from '../../utils/console'
import { Factory, Factory1, Factory2 } from './factorys'

group('factory1', () => {
  const factory1: Factory = new Factory1()

  const productA1 = factory1.createProductA()
  const productB1 = factory1.createProductB()

  log('productA1:', productA1)
  log('productB1:', productB1)
})

group('factory2', () => {
  const factory2: Factory = new Factory2()

  const productA2 = factory2.createProductA()
  const productB2 = factory2.createProductB()

  log('productA2:', productA2)
  log('productB2:', productB2)
})
