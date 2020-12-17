function Promise (executor) {
  if (typeof executor !== 'function') {
    throw new TypeError(`Promise Constructor expect function, but get ${typeof executor}`)
  }
  const self = this
  this.state = 'pending'
  this.resolveCallbacks = []
  this.rejectCallbacks = []
  this.value = undefined
  this.reason = undefined

  function resolve (value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(() => {
      if (self.state === 'pending') {
        self.state = 'resolved'
        self.value = value
        // 异步调用所有接受回调函数
        self.resolveCallbacks.map(resolve => resolve(value))
      }
    })
  }
  function reject (reason) {
    setTimeout(() => {
      if (self.state === 'pending') {
        self.state = 'rejected'
        self.reason = reason
        // 异步调用所有拒绝回调函数
        self.rejectCallbacks.map(reject => reject(reason))
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

Promise.prototype.then = function (fn1, fn2) {
  const self = this
  let p2

  fn1 = typeof fn1 === 'function' ? fn1 : v => v
  fn2 = typeof fn2 === 'function' ? fn2 : r => {throw r}

  if (self.state === 'resolved') {
    return p2 = new Promise((resolve, reject) => {
      // 改成异步执行回调
      setTimeout(() => {
        try {
          const x = fn1(self.value)
          resolvePromise(p2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    })
  } else if (self.state === 'rejected') {
    if (fn2 == null) {
      return self
    }
    return p2 = new Promise((resolve, reject) => {
      // 改成异步执行回调
      setTimeout(() => {
        try {
          const x = fn2(self.reason)
          resolvePromise(p2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    })
  } else if (self.state === 'pending') {
    // 新增 pending 状态，即调用 then 时 Promise 尚未完成
    // -> 向两种回调队列注册回调函数，resolve/reject 时异步调用
    return p2 = new Promise((resolve, reject) => {
      // 注册接受状态回调函数
      self.resolveCallbacks.push(value => {
        try {
          const x = fn1(value)
          resolvePromise(p2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
      if (fn2 == null) {
        return
      }
      // 注册拒绝状态回调函数
      self.rejectCallbacks.push(reason => {
        try {
          const x = fn2(reason)
          resolvePromise(p2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    })
  } else {
    throw new TypeError(`unknown Promise state: ${self.state}`)
  }
}

Promise.prototype.catch = function (fn) {
  return this.then(null, fn)
}

function resolvePromise (p2, x, resolve, reject) {
  if (p2 === x) {
    return reject(new TypeError('Chaining cycle detected for Promise'))
  }

  if (x instanceof Promise) {
    x.then(value => {
      resolve(value)
    }).catch(err => {
      reject(err)
    })
    return
  }

  if ((x != null) && ((typeof x === 'object') || typeof x === 'function')) {
    let called = false
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(x, value => {
          if (called) {
            return
          }
          called = true
          return resolvePromise(p2, value, resolve, reject)
        }, err => {
          if (called) {
            return
          }
          called = true
          return reject(err)
        })
      } else {
        resolve(x)
      }
    } catch (err) {
      if (called) {
        return
      }
      reject(err)
    }
  } else {
    resolve(x)
  }
}

const p = new Promise((resolve, reject) => {
  console.log('main task start')
  // 模拟异步函数，延迟 1s
  setTimeout(() => {
    resolve(1)
  }, 1000)
}).then(value => {
  console.log(`first then callback, with value = ${value}`)
  return new Promise((resolve, reject) => {
    resolve(2)
  })
}).then(value => {
  console.log(`second then callback, get value = ${value}`)
  throw new Error('intentionally error occur')
}).catch(err => {
  console.log(`error occur, with message = "${err.message}"`)
})