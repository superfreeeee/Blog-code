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

test('async / await resolve', async () => {
  const res = await asyncPromise(true)
  expect(res).toBe('success')
})

test('async / await reject', async () => {
  expect.assertions(1)
  try {
    const res = await asyncPromise(false)
    expect(res).toBe('success')
  } catch (e) {
    expect(e).toBe('fail')
  }
})

test('async / await with resolves/rejects', async () => {
  expect.assertions(2)
  await expect(asyncPromise(true)).resolves.toBe('success')
  await expect(asyncPromise(false)).rejects.toBe('fail')
})
