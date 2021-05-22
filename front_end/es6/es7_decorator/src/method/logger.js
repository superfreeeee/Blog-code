import { log } from '../utils'

function logger(target, name, desc) {
  const fn = desc.value

  desc.value = function (...args) {
    log(`[logger] invoke ${target.constructor.name}#${name}`)
    return fn.apply(this, ...args)
  }
  return desc
}

class Counter {
  count = 0

  @logger
  increment() {
    this.count++
    this.show()
  }

  @logger
  reset() {
    this.count = 0
    this.show()
  }

  show() {
    log(`count = ${this.count}`)
  }
}

log('Counter: ', Counter)

const counter = new Counter()
log('counter: ', counter)
counter.increment()
counter.increment()
counter.increment()
counter.reset()
counter.increment()
