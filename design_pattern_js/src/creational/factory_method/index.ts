import { group, log } from '../../utils/console'
import { Creator, CreatorA, CreatorB } from './creators'
import {
  createProductA,
  createProductB,
  ProductCreator,
} from './static'

group('test Creator', () => {
  function testCreator(creator: Creator) {
    creator.operation()
  }

  testCreator(new CreatorA())
  testCreator(new CreatorB())
})

group('test static Creator', () => {
  function testStaticCreator(creator: ProductCreator) {
    const product = creator()
    log('product:', product)
  }

  testStaticCreator(createProductA)
  testStaticCreator(createProductB)
})
