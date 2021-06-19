import { log } from '../../utils/console'

/********** singleton by static instance **********/
// access by ProductWithStaticInstance.getInstance()
export class ProductWithStaticInstance {
  static _instance: ProductWithStaticInstance | undefined

  constructor() {
    log('ProductWithStaticInstance created')
  }

  static getInstance(): ProductWithStaticInstance {
    if (!ProductWithStaticInstance._instance) {
      ProductWithStaticInstance._instance =
        new ProductWithStaticInstance()
    }
    return ProductWithStaticInstance._instance
  }
}

/********** singleton by Proxy using registry **********/
class ProductWithProxy {
  constructor() {
    log('ProductWithProxy created')
  }
}

const registry2: { instance: null | ProductWithProxy } = {
  instance: null,
}

// access by instanceWithProxy.instance
export const instanceWithProxy = new Proxy(registry2, {
  get(target, key, receiver) {
    if (key !== 'instance') return null
    let instance = Reflect.get(target, key, receiver)
    if (!instance) {
      instance = new ProductWithProxy()
      Reflect.set(target, key, instance, receiver)
    }
    return instance
  },
})

/********** singleton by ES6 Module **********/
// directly access
export const instanceWithModule = new (class ProductWithModule {
  constructor() {
    log('ProductWithModule created')
  }
})()
