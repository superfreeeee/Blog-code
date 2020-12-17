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
  function reject (reason) {
    setTimeout(() => {
      if (self.state === 'pending') {
        self.state = 'rejected'
        self.reason = reason
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
    return p2 = new Promise((resolve, reject) => {
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
    return p2 = new Promise((resolve, reject) => {
      self.resolveCallbacks.push(value => {
        try {
          const x = fn1(value)
          resolvePromise(p2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
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

Promise.all = (arr = []) => {
  if (!Array.isArray(arr)) {
    throw new TypeError(`arguments for Promise.all must be an Array`)
  }
  return new Promise((resolve, reject) => {
    const values = []
    arr.map(p => {
      p.then(value => {
        values.push(value)
        if (values.length === arr.length) {
          return resolve(values)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
}

Promise.retry = (p, times, delay) => {
  return new Promise((resolve, reject) => {
    function attempt () {
      p().then(value => {
        resolve(value)
      }).catch(err => {
        if (times === 0) {
          reject(err)
        } else {
          times--;
          setTimeout(attempt, delay)
        }
      })
    }
    attempt()
  })
}

const task1 = new Promise((resolve, reject) => {resolve(1)})
const task2 = new Promise((resolve, reject) => {resolve(2)})
const task3 = new Promise((resolve, reject) => {resolve(3)})

const p = Promise.all([task1, task2, task3])
p.then(values => {
  console.log(values)
})

const task4 = new Promise((resolve, reject) => {resolve(2)})
const task5 = new Promise((resolve, reject) => {resolve(3)})
const task6 = new Promise((resolve, reject) => {reject(new Error('intentionally error'))})

const p2 = Promise.all([task4, task5, task6])
p2.then(values => {
  console.log('It will print if all tasks resolved')
}).catch(err => {
  console.log('some tasks were rejected')
  console.log(`error occur with message: ${err.message}`)
})

const p3 = Promise.retry(() => {
  console.log('try')
  return new Promise((resolve, reject) => {
    reject('always reject')
  })
}, 1, 1000)

p3.then(value => {
  console.log(`retry for 3 times ${value}`)
}).catch(err => {
  console.log(`retry still reject, with message: ${err}`)
})