import { log, group } from '../utils'

const test =
  (tag) =>
  (...args) => {
    group(tag, () => {
      args.forEach((arg, i) => log(i, arg))
    })
  }

class A {
  @test('field')
  num = 0

  @test('accessor')
  get show() {
    log(`num = ${this.num}`)
  }
}
