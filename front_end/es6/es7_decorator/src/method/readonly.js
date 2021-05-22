import { log } from '../utils'

function readonly(target, name, desc) {
  desc.writable = false
  desc.enumerable = true
}

class A {
  @readonly
  f() {}
}

log('A.prototype', A.prototype)

try {
  A.prototype.f = 'new one'
} catch (e) {
  log(e)
}
