import { log } from '../utils'

function test(...args) {
  args.forEach((arg, i) => log(i, arg))
}

class A {
  @test
  field = 0

  @test
  f() {}

  @test
  get name() {}
}

class B {
  @test2
  f() {}
}

function test2(target, name, desc) {
  log('target: ', target)
  log('name:   ', name)
  log('desc:   ', desc)
}
