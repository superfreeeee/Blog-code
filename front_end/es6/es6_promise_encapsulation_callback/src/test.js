const request = require('request')

// callback function
function normalCallback (test, cb) {
  console.log(`invoke function f from test ${test}`)
  request.get('http://localhost:3000', (err, res, body) => {
    cb(err, body)
  })
}

const test1 = () => {
  // 最原始的回调函数使用方式
  normalCallback('test1', (err, data) => {
    if (err) {
      console.log('err occur')
    } else {
      console.log(`receive data ${data}`)
    }
  })
}

// 将回调函数封装成 Promise 对象
const generatePromise = (test) => {
  return new Promise(function (resolve, reject) {
    normalCallback(test, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const test2 = () => {
  // 调用封装好的方法返回 Promise 对象
  generatePromise('test2')
    .then(res => {
      console.log(`receive data ${res}`)
    })
    .catch(err => {
      console.log('err occur')
    })
}

// 使用 async 异步函数，内部使用 await 进行 Promise 对象同步化
async function asyncUsage () {
  const res = await generatePromise('test3')
  console.log(`receive data ${res}`)
}

const test3 = () => {
  asyncUsage()
}

test1()
test2()
test3()
