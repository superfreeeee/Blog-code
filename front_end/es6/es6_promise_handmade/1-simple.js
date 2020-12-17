function Promise (executor) {
  // 主任务必须是一个函数
  //   主任务函数形式：function (resolve, reject) {}
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
    // 等待状态 -> 接受状态
    if (self.state === 'pending') {
      self.state = 'resolved'
      self.value = value
    }
  }
  function reject (reason) {
    // 等待状态 -> 拒绝状态
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

  // fn1 为接受状态时的回调函数，提供默认函数实现值穿透
  fn1 = typeof fn1 === 'function' ? fn1 : v => v
  // fn2 为拒绝状态时的回调函数，提供默认函数实现值穿透
  fn2 = typeof fn2 === 'function' ? fn2 : r => {throw r}

  if (self.state === 'resolved') {
    // 1. 接受状态
    return p2 = new Promise((resolve, reject) => {
      try {
        // 执行接受状态回调函数 fn1
        const x = fn1(self.value)
        // 回调函数返回值 x 将作为返回的 Promise 的接受值，使用 resolve 接受
        resolve(x)
      } catch (err) {
        reject(err)
      }
    })
  } else if (self.state === 'rejected') {
    // 2. 拒绝状态
    if (fn2 == null) {
      // 若未提供 fn2 则按原样传递下去
      return self
    }
    return p2 = new Promise((resolve, reject) => {
      try {
        // 执行拒绝状态回调函数 fn2
        const x = fn2(self.reason)
        // 维持原状态，返回的 Promise 再拒绝返回值
        reject(x)
      } catch (err) {
        reject(err)
      }
    })
  } else {
    // 3. 其他状态
    throw new TypeError(`unknown Promise state: ${self.state}`)
  }
}

Promise.prototype.catch = function (fn) {
  // 拒绝回调函数作为第二个参数
  return this.then(null, fn)
}

const p = new Promise((resolve, reject) => {
  console.log('main task start')
  resolve(1) // 同步函数任务
}).then(value => {
  console.log(`first then callback, with value = ${value}`)
  return 2
}).then(value => {
  console.log(`second then callback, with value = ${value}`)
  throw new Error('intentionally error occur')
}).then(value => {
  console.log(`third then callback, which should be skipped until meet rejected callback`)
}).catch(err => {
  console.log(`error occur, with message = "${err.message}"`)
}).catch(value => {
  console.log(`fourth then callback, with value = ${value}`)
})