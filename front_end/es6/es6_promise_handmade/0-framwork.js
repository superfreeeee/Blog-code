function Promise (executor) {
  const self = this // 保留 this
  this.state = 'pending' // 初始状态为 pending
  this.resolveCallbacks = [] // resolve 回调函数队列
  this.rejectCallbacks = [] // reject 回调函数队列
  this.value = undefined // resolved 状态时保存接受值
  this.reason = undefined // rejected 状态时返回拒绝理由

  function resolve (value) {} // 接受函数
  function reject (reason) {} // 拒绝函数

  try {
    executor(resolve, reject) // 执行主任务
  } catch (reason) {
    reject(reason)
  }
}

// 链式调用
//   fn1 为接受状态的回调函数
//   fn2 为拒绝拒绝状态的回调函数，可选
Promise.prototype.then = function (fn1, fn2) {}

// 链式调用
//   用于捕获拒绝状态的
Promise.prototype.catch = function (fn) {}
