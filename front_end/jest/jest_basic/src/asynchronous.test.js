function asyncFunction(cb, ms = 1000) {
  setTimeout(() => {
    cb('A Message')
  }, ms)
}

test('callback', (done) => {
  asyncFunction((msg) => {
    expect(msg).toBe('A Message')
    expect(msg).not.toBe('Other Message')
    done()
  })
})

function createPromise(fn) {
  return () =>
    new Promise((resolve, reject) => {
      try {
        fn((msg) => {
          resolve(msg)
        })
      } catch (e) {
        reject(e)
      }
    })
}

const asyncFunctionWithPromise = createPromise(asyncFunction)

test('promise', () => {
  return asyncFunctionWithPromise().then((msg) => {
    expect(msg).toBe('A Message')
    expect(msg).not.toBe('Other Message')
  })
})

const asyncPromise = (success = true) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve('success')
      } else {
        reject('fail')
      }
    })
  })

test('promise resolves', () => {
  return expect(asyncPromise()).resolves.toBe('success')
})

test('promise rejects', () => {
  return expect(asyncPromise(false)).rejects.toBe('fail')
})
