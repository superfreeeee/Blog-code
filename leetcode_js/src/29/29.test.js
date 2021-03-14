const { expect, test } = require('@jest/globals')
const { divide } = require('./29')

test('test 1', () => {
  expect(divide(10, 3)).toBe(3)
})

test('test 2', () => {
  expect(divide(7, -3)).toBe(-2)
})
