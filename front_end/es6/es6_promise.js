// function tenDivideBy(division, callback) {
//   if(division != 0) {
//     callback(null, 10 / division)
//   } else {
//     callback(new Error('divide by zero'))
//   }
// }

// function somethingAfter(err, res) {
//   if(err) {
//     console.log('error occur')
//     console.log(err.message)
//   } else {
//     console.log('procedure success')
//     console.log(res)
//   }
// }

// tenDivideBy(10, somethingAfter)

// tenDivideBy(0, somethingAfter)

// let promise = new Promise(function(resolve, reject) {
//   let promise2 = () => new Promise(function(resolve, reject) {
//     let r = Math.floor(Math.random() * 100)
//     console.log(`r2 = ${r}`)
//     if(r < 50) {
//       resolve(r)
//     } else {
//       reject(new Error(`r = ${r} is bigger than 50`))
//     }
//   })
//   let r = Math.floor(Math.random() * 100)
//   console.log(`r1 = ${r}`)
//   if(r >= 50) {
//     resolve(promise2)
//   } else {
//     reject(new Error(`r = ${r} is lower than 50`))
//   }
//   return
// })
// promise.then(res => {
//   console.log(`success with r = ${res}`)
// }, err => {
//   console.log(`error: ${err.message}`)
// }).then(res => {
//   console.log(`success with r = ${res}`)
// }, err => {
//   console.log(`error: ${err.message}`)
// })

// let p1 = new Promise(function(resolve, reject) {
//   setTimeout(() => reject(new Error('p1 error')), 3000)
// })

// let p2 = new Promise(function(resolve, reject) {
//   setInterval(() => resolve(p1), 1000)
// })

// p2
// .then(res => {
//   console.log(res)
// })
// .catch(err => {
//   console.log(err.message)
// })
// function startRandomTest() {
//   let promise = new Promise(function(resolve, reject) {
//     let r = Math.floor(Math.random() * 100)
//     console.log(`r = ${r}`)
//     if(r >= 50) {
//       resolve(r)
//     } else {
//       reject(new Error(`r = ${r} is lower than 50`))
//     }
//   })
//   return promise
// }

// startRandomTest().then(res => {
//   console.log(`promise resolve with res = ${res}`)
//   return startRandomTest()
// }).then(res => {
//   console.log(`promise 2 resolve with res = ${res}`)
// }, err => {
//   console.log(`unexpected number 2: ${err.message}`)
// })

// let promise = new Promise(function(resolve, reject) {
//   // reject(new Error('catch by rejected callback'))
//   throw new Error('normal Exception')
// })
// promise.catch(err => {
//   console.log(err.message)
// })

// let promise = new Promise(function(resolve, reject) {
//   resolve('success message')
//   throw new Error('throw error')
// })

// promise.then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err.message)
// })

// function buildPromise(succeed) {
//   if(succeed) {
//     return new Promise(function(resolve, reject) {
//       resolve('success')
//     })
//   } else {
//     return new Promise(function(resolve, reject) {
//       reject('error')
//     })
//   }
// }

// buildPromise().then(res => {
//   console.log('first then callback')
//   return buildPromise()
// }).then(res => {
//   console.log('second then callback')
// }).catch(err => {
//   console.log('catch callback')
// })

// new Promise(function(resolve, reject) {
//   reject(new Error('some error'))
// }).catch(err => {
//   console.log(`err message: ${err.message}`)
//     return 'after catch message'
// }).then(res => {
//   console.log(`res: ${res}`)
//   throw new Error('throw in then with no catch after')
// })

// new Promise(function(resolve, reject) {
//   reject(new Error('some error'))
// }).catch(err => {
//   console.log(`err message: ${err.message}`)
//   throw new Error('new error throw by catch callbcak')
// }).catch(err => {
//   console.log(`err message 2: ${err.message}`)
// })

function createPromise(ms, succeed) {
  if (succeed) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve(`resolve in ${ms}`)
      }, ms)
    })
  } else {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        reject(new Error(`reject in ${ms}`))
      }, ms)
    })
  }
}

// Promise.all([
//   createPromise(1000, true),
//   createPromise(2000, true),
//   createPromise(3000, true)
// ]).then(results => {
//   console.log(results)
// })

// Promise.all([
//   createPromise(1000, true),
//   createPromise(2000, false),
//   createPromise(3000, true)
// ])
//   .then((results) => {
//     console.log(results)
//   })
//   .catch((err) => {
//     console.log(err.message)
//   })

// Promise.race([
//   createPromise(3000, true),
//   createPromise(1000, true),
//   createPromise(2000, true)
// ]).then(res => {
//   console.log(res)
// })

// Promise.race([
//   createPromise(3000, false),
//   createPromise(1000, true),
//   createPromise(2000, false)
// ]).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err.message)
// })

// Promise.resolve(createPromise(1000, false)).catch(err => {
//   console.log(err.message)
// })

function createThenable(ms, succeed) {
  if (succeed) {
    return {
      then(resolve, reject) {
        setTimeout(() => {
          resolve(`resolve in ${ms}`)
        }, ms)
      }
    }
  } else {
    return {
      then(resolve, reject) {
        setTimeout(() => {
          reject(new Error(`reject in ${ms}`))
        }, ms)
      }
    }
  }
}

// Promise.resolve(createThenable(1000, true)).then((res) => {
//   console.log(res)
// })

// Promise.resolve(createThenable(1000, false)).catch((err) => {
//   console.log(err.message)
// })

// let person = {
//   id: 0,
//   name: 'John'
// }
// Promise.resolve(person).then(res => {
//   console.log(res)
// })

// Promise.resolve().then(res => {
//   console.log(res)
// })

// Promise.reject()

Promise.prototype.done = function (onResolved, onRejected) {
  this.then(onResolved, onRejected).catch((err) => {
    setTimeout(() => {
      throw err
    }, 0)
  })
}

Promise.prototype.finally = function(callback) {
  let P = this.constructor
  return this.then(
    res => P.resolve(callback()).then(() => value),
    err => P.resolve(callback()).then(() => { throw err })
  )
}
