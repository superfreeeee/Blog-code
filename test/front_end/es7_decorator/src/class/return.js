import { log } from '../utils'

function replaceWithPrimitive(target) {
  return 123
}

function replaceWithObject(target) {
  return { target }
}

@replaceWithPrimitive
class A {}

@replaceWithObject
class B {}

log('class A: ', A)
log('class B: ', B)
