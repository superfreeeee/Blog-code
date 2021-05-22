import { log } from '../utils'

function mixin(...methods) {
  return (target) => {
    Object.assign(target.prototype, ...methods)
  }
}

const humanActions = {
  greeting() {
    log(`this is ${this.name}`)
  },
}

const birdActions = {
  fly() {
    log('I can fly')
  },
}

@mixin(humanActions, birdActions)
class A {}

log('A:           ', A)
log('A.prototype: ', A.prototype)
