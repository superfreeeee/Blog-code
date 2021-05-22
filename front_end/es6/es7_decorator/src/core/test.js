import { log, group } from '../utils'
import { autobind, readonly } from 'core-decorators'

group('autobind', () => {
  let id = 0

  class A {
    constructor() {
      this.id = id++
    }

    @autobind
    getInstance() {
      return this
    }
  }

  const a1 = new A()
  const a2 = new A()

  log('a1: ', a1)
  log('a2: ', a2)

  const getInstance1 = a1.getInstance
  const getInstance2 = a2.getInstance

  log('getInstance1(): ', getInstance1())
  log('getInstance2(): ', getInstance2())
})

group('readonly', () => {
  class Model {
    @readonly
    num = 0
  }

  const data = new Model()
  log('data: ', data)
  try {
    data.num = 1
  } catch (e) {
    log(e)
  }
})
