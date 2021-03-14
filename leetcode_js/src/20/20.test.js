const { expect, test } = require('@jest/globals')
const { isValid } = require('./20')

test('test 1', () => {
  expect(isValid('()')).toBe(true)
})

test('test 2', () => {
  expect(isValid('()[]{}')).toBe(true)
})

test('test 3', () => {
  expect(isValid('(]')).toBe(false)
})

test('test 4', () => {
  expect(isValid('([)]')).toBe(false)
})

test('test 5', () => {
  expect(isValid('{[]}')).toBe(true)
})
