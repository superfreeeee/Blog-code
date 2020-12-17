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
    if (self.state === 'pending') {
      self.state = 'resolved'
      self.value = value
    }
  }
  function reject (reason) {
    if (self.state === 'pending') {
      self.state = 'rejected'
      self.reason = reason
    }
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
      try {
        const x = fn1(self.value)
        // resolve(x)
        // 使用 resolvePromise 重新包装返回值到 p2
        resolvePromise(p2, x, resolve, reject)
      } catch (err) {
        reject(err)
      }
    })
  } else if (self.state === 'rejected') {
    if (fn2 == null) {
      return self
    }
    return p2 = new Promise((resolve, reject) => {
      try {
        const x = fn2(self.reason)
        // reject(x)
        // 使用 resolvePromise 重新包装返回值到 p2
        resolvePromise(p2, x, resolve, reject)
      } catch (err) {
        reject(err)
      }
    })
  } else {
    throw new TypeError(`unknown Promise state: ${self.state}`)
  }
}

Promise.prototype.catch = function (fn) {
  return this.then(null, fn)
}

// 将返回值 x 重新包装成 Promise
function resolvePromise (p2, x, resolve, reject) {
  // 避免循环调用（等待自己）
  if (p2 === x) {
    return reject(new TypeError('Chaining cycle detected for Promise'))
  }
  // 如果返回值是一个 Promise
  if (x instanceof Promise) {
    // 则直接使用 x 的接受/拒绝回调函数
    x.then(value => {
      resolve(value)
    }).catch(err => {
      reject(err)
    })
    return
  }

  if ((x != null) && ((typeof x === 'object') || typeof x === 'function')) {
    // 1. 如果是对象 object 或是方法 funciton
    let called = false // 确保只有一个回调被触发
    try { // 访问 x.then 可能产生异常
      const then = x.then
      if (typeof then === 'function') {
        // 1.1 x.then 为 function，表示 x 是一个 thenable 对象/函数
        // 使用 Function.prototype.call 方法调用 then，语法 call(this, fn1, fn2)
        //   此时 x 作为回调的上下文，传入 then 方法需要的 fn1, fn2
        then.call(x, value => {
          // 检查 called，并将结果 x.then 接受状态下的结果再包装成 Promise
          if (called) {
            return
          }
          called = true
          return resolvePromise(p2, value, resolve, reject)
        }, err => {
          // 检查 called，x.then 被拒绝，则直接拒绝当前 x
          if (called) {
            return
          }
          called = true
          return reject(err)
        })
      } else {
        // 1.2 x 不是 thenable，直接接受
        resolve(x)
      }
    } catch (err) {
      if (called) {
        return
      }
      reject(err)
    }
  } else {
    // 2. 一般返回值，直接接受
    resolve(x)
  }
}

const p = new Promise((resolve, reject) => {
  console.log('main task start')
  resolve(1)
}).then(value => {
  console.log(`first then callback, with value = ${value}`)
  // 模拟返回值为 Promise 对象
  return new Promise((resolve, reject) => {
    resolve(2)
  })
}).then(value => {
  console.log(`second then callback, get value = ${value}`)
  throw new Error('intentionally error occur')
}).catch(err => {
  console.log(`error occur, with message = "${err.message}"`)
})