import { log, group } from '../utils'

function bindSelf(target, name, { value: fn, configurable, enumerable }) {
  const { constructor } = target

  return {
    configurable,
    enumerable,
    get() {
      group('in getter', () => {
        log(`target === A.prototype: ${target === A.prototype}`)
        log(`this === a:             ${this === a}`)
      })
      const boundFn = fn.bind(this)
      return boundFn
    },
    set() {},
  }
}

let id = 0

class A {
  id = id++

  @bindSelf
  getInstance() {
    return this
  }
}

const a = new A()
const a2 = new A()
const getInstance = a.getInstance
log(getInstance())
const getInstance2 = a2.getInstance
log(getInstance2())
