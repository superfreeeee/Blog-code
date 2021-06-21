import { log } from '../../utils/console'
import {
  ConcreteFlyweight,
  ExternalState,
  UnsharedConcreteFlyweight,
} from './flyweights'
import { registry } from './registry'

type FlyweightAccess = [string, ExternalState]

class FlyweightFactory {
  count = 0

  SHARED_KEY = 'shared'

  getUnsharedKey(id: number) {
    return `unshared-${id}`
  }

  createSharedFlyweight(name: string): FlyweightAccess {
    const state: ExternalState = { name }
    const key = this.SHARED_KEY
    if (!registry.has(key)) {
      registry.set(key, new ConcreteFlyweight())
    }
    return [this.SHARED_KEY, state]
  }

  createUnsharedFlyweight(name: string): FlyweightAccess {
    const state: ExternalState = { name }
    const key = this.getUnsharedKey(this.count++)
    registry.set(key, new UnsharedConcreteFlyweight())
    return [key, state]
  }
}

const factory = new FlyweightFactory()
const a = factory.createSharedFlyweight('A')
const b = factory.createSharedFlyweight('B')
const c = factory.createSharedFlyweight('C')
const d = factory.createUnsharedFlyweight('D')
const e = factory.createUnsharedFlyweight('E')
const f = factory.createUnsharedFlyweight('F')

function operation([key, state]: FlyweightAccess) {
  registry.get(key)?.operation(state)
}

operation(a)
operation(b)
operation(c)
operation(d)
operation(e)
operation(f)
