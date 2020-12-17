// "use strict"

const obj = { a: 0, b: 1, c: 2, _a: 3, _b: 4, _c: 5 }
const array = [5, 4, 3, 2, 1]
const Person = function (id=-1, name) {
  this.id = id
  this.name = name
}
const proxy = new Proxy(Person, {
  // 默認
  // get(target, propKey, receiver) {
  //   return target[propKey]
  // },

  // 訪問控制
  // get(target, propKey, receiver) {
  //   console.log(target === obj)
  //   console.log(receiver === proxy)
  //   if(propKey in target) {
  //     return target[propKey]
  //   } else {
  //     throw new ReferenceError(`property '${propKey}' not exist`)
  //   }
  // },

  // 負數
  // get(target, propKey, receiver) {
  //   let idx = Number(propKey)
  //   if(idx < 0) {
  //     idx += target.length
  //   }
  //   return target[idx]
  // },

  // set(target, propKey, value, receiver) {
  //   console.log('\n=== set ===')
  //   console.log(target === obj)
  //   console.log(receiver === proxy)
  //   console.log('--- set over ---\n')
  // },

  // 默認行為
  // set(target, propKey, value, receiver) {
  //   target[propKey] = value
  // },

  // 限定數字
  // set(target, propKey, value, receiver) {
  //   if(Number.isInteger(value)) {
  //     console.log(`set ${propKey} with ${value}`)
  //     target[propKey] = value
  //   } else {
  //     console.log('should be integer')
  //   }
  // },

  // 拒絕設置內部屬性
  // set(target, propKey, value, receiver) {
  //   const assertPrivate = (key) => {
  //     if(key[0] === '_') {
  //       throw new ReferenceError(`can't set private property`)
  //     }
  //   }
  //   assertPrivate(propKey)
  //   console.log(`set ${propKey} with ${value}`)
  //   target[propKey] = value
  // }

  // 默認行為
  // has(target, propKey) {
  //   return propKey in target
  // }

  // 隱藏私有變量
  // has(target, propKey) {
  //   if(propKey[0] === '_') {
  //     return false
  //   }
  //   return propKey in target
  // },

  // 默認行為
  // deleteProperty(target, propKey) {
  //   return delete target[propKey]
  // },

  // 阻止刪除私有變量
  // deleteProperty(target, propKey) {
  //   if(propKey[0] === '_') {
  //     throw new ReferenceError("can't delete private property")
  //   }
  //   return delete target[propKey]
  // }

  // 默認行為
  // defineProperty(target, propKey, propDesc) {
  //   return Object.defineProperty(target, propKey, propDesc)
  // },

  // 拋出異常
  // defineProperty(target, propKey, propDesc) {
  //   // 在嚴格模式之下返回 false 將拋出異常
  //   return false
  // },

  // 默認行為
  // ownKeys(target) {
  //   return Object.keys(target)
  // },

  // 隱藏私有屬性
  // ownKeys(target) {
  //   return Reflect.ownKeys(target).filter(key => key[0] !== '_')
  // },

  // 默認行為
  // getOwnPropertyDescriptor(target, propKey) {
  //   return Object.getOwnPropertyDescriptor(target, propKey)
  // },

  // 限制私有屬性訪問
  // getOwnPropertyDescriptor(target, propKey) {
  //   if(propKey[0] === '_') {
  //     return undefined
  //   }
  //   return Object.getOwnPropertyDescriptor(target, propKey)
  // },

  // 默認行為
  // preventExtensions(target) {
  //   Object.preventExtensions(target)
  //   return true
  // },

  // 可擴展時返回 true
  // preventExtensions(target) {
  //   console.log(`target is extensible: ${Object.isExtensible(target)}`)
  //   return true
  // },

  // 默認行為
  // getPrototypeOf(target) {
  //   return Object.getPrototypeOf(target)
  // },

  // 模擬繼承 Promise
  // getPrototypeOf(target) {
  //   return Promise.prototype
  // },

  // 默認行為
  // setPrototypeOf(target, proto) {
  //   Object.setPrototypeOf(target, proto)
  //   return true
  // }

  // 禁止修改原型
  // setPrototypeOf(target, proto) {
  //   throw new ReferenceError("Change prototype is forbidden")
  // }

  // 默認行為
  // isExtensible(target) {
  //   return Object.isExtensible(target)
  // }

  // 可擴展性不同步
  // isExtensible(target) {
  //   return !Object.isExtensible(target)
  // }

  // 默認行為
  // apply(target, object, args) {
  //   return target.apply(object, args)
  // },

  // 展示不同調用方法攔截後的參數形式
  // apply(target, object, args) {
  //   console.log('=== invoke ===')
  //   console.log(object)
  //   console.log(args)
  //   return target.apply(object, args)
  // }

  // 默認行為
  // construct(target, args) {
  //   return new target(...args)
  // }

  // 返回非對象
  // construct(target, args) {
  //   return 1
  // }

  // get(target, propKey, receiver) {}
  // set(target, propKey, value, receiver) {}
  // has(target, propKey) {}
  // deleteProperty(target, propKey) {}
  // ownKeys(target) {}
  // getOwnPropertyDescriptor(target, propKey) {}
  // defineProperty(target, propKey, propDesc) {}
  // preventExtensions(target) {}
  // getPrototypeOf(target) {}
  // isExtensible(target) {}
  // setPrototypeOf(target, proto) {}
  // apply(target, object, args) {}
  // construct(target, args) {}
})
// console.log(proxy.a)
// console.log('- - - - -')
// proxy.x = 123
// console.log('- - - - -')
// console.log(proxy.x)
// console.log('- - - - -')
// console.log(proxy.y)
// console.log(proxy[2])
// console.log(proxy[-1])
// 'a' in proxy
// const { proxy: proxy2, revoke } = Proxy.revocable({}, {})
// console.log(proxy2)
// revoke()
// console.log(proxy2)

// console.log(proxy)
// console.log(delete proxy.a)
// console.log(proxy)
// console.log(delete proxy._a)

// console.log(proxy)
// proxy.a = 123
// proxy.d = 456
// console.log(proxy)

// console.log(Object.keys(proxy))

// console.log(Object.getOwnPropertyDescriptor(proxy, 'a'))
// console.log(Object.getOwnPropertyDescriptor(proxy, '_a'))

// Object.preventExtensions(proxy)
// res._d = 123

// console.log(Object.getPrototypeOf(proxy))
// console.log(Object.getPrototypeOf(proxy) === Object.prototype)
// console.log(proxy instanceof Object)

// console.log(Object.getPrototypeOf(proxy))
// console.log(proxy instanceof Promise)

// Object.setPrototypeOf(proxy, {})

// console.log(Object.isExtensible(proxy))

// proxy()
// proxy(1, 2, 3)
// proxy.apply({ use: 'apply' }, [4, 5, 6])
// proxy.call({ use: 'call' }, 7, 8, 9)

new proxy()