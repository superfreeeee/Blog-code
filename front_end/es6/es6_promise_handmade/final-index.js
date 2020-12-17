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
        self.resolveCallbacks.map(resolve => resolve(value))
      }
    })
  }

  function reject (reason)  {
    setTimeout(() => {
      if (self.state === 'pending') {
        self.state = 'rejected'
        self.reason = reason
        self.rejectCallbacks.map(reject => reject(reason))
      }
    })
  }

  try {
    // console.log('execute')
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

Promise.prototype.then = function (fn1, fn2) {
  const self = this
  let p2

  fn1 = typeof fn1 === 'function' ? fn1 : (v) => v
  fn2 = typeof fn2 === 'function' ? fn2 : (r) => r

  if (self.state === 'resolved') {
    // console.log('resolved')
    return p2 = new Promise(function (resolve, reject) {
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
    // console.log('rejected')
    return p2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          const x = fn2(self.value)
          resolvePromise(p2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    })
  } else if (self.state === 'pending') {
    // console.log('pending')
    return p2 = new Promise(function (resolve, reject) {
      self.resolveCallbacks.push((value) => {
        try {
          const x = fn1(value)
          resolvePromise(p2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
      self.rejectCallbacks.push((reason) => {
        try {
          const x = fn2(reason)
          resolvePromise(p2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  } else {
    throw new Error(`unknown Promise state ${self.state}`)
  }

  function resolvePromise (p2, x, resolve, reject) {
    if (p2 === x) {
      return reject(new TypeError(`Chaining cycle detected for Promise`))
    }
    if (x instanceof Promise) {
      x.then((value) => {
        resolve(value)
      }, (err) => {
        reject(err)
      })
      return
    }

    if ((x != null) && ((typeof x === 'object') || typeof x === 'function')) {
      const then = x.then
      let called = false
      try {
        if (typeof then === 'function') {
          then.call(x, (value) => {
            if (called) {
              return
            }
            called = true
            resolvePromise(p2, value, resolve, reject)
          }, (err) => {
            if (called) {
              return
            }
            called = true
            reject(err)
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
      // console.log(`normal value x ${x}`)
      resolve(x)
    }
  }
}

const p = new Promise(function (resolve, reject) {
  // resolve(1)
  setTimeout(() => {
    resolve(1)
  }, 1000)
}).then(val => {
  console.log(`then 1, val = ${val}`)
  return 2
}).then(val => {
  console.log(`then 2, val = ${val}`)
  throw new Error('invoke error')
}).then(() => {}, err => {
  console.log(Object.getOwnPropertyNames(err))
  console.log(err)
  console.log(err.message)
  console.log(err.stack)
})