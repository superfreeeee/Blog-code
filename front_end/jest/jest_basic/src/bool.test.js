test('null', () => {
  const n = null
  expect(n).toBeNull() // toBeNull：匹配 null
  expect(n).toBeDefined() // toBeDefined：匹配非 undefined
  expect(n).not.toBeUndefined() // toBeUndefined：匹配 undefined
  expect(n).not.toBeTruthy() // toBeTruthy：匹配真值
  expect(n).toBeFalsy() // toBeFalsy：匹配假值
})

test('zero', () => {
  const zero = 0
  expect(zero).not.toBeNull()
  expect(zero).toBeDefined()
  expect(zero).not.toBeUndefined()
  expect(zero).not.toBeTruthy()
  expect(zero).toBeFalsy()
})
