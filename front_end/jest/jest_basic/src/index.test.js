const sum = require('./index.js')

test('test 1', () => {
  expect(sum(1, 2)).toBe(3)
})

test('test 2', () => {
  expect(sum(-1, 1)).toBe(0)
})

test('test 3', () => {
  expect(sum(Infinity, Infinity)).toBe(Infinity)
})
