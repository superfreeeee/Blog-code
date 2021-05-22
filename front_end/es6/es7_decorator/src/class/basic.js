import { log } from '../utils'

function test(...args) {
  let i = 0
  args.forEach((arg) => log(i++, arg))
}

@test
class MyClass {}

function testable(target) {
  target._isTestable = true
}

@testable
class TestableClass {}

class OtherClass {}

log('TestableClass:             ', TestableClass)
log('TestableClass._isTestable: ', TestableClass._isTestable)

log('OtherClass:             ', OtherClass)
log('OtherClass._isTestable: ', OtherClass._isTestable)
