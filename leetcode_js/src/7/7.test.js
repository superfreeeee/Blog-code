const { expect, test } = require('@jest/globals')
const { reverse } = require('./7')

test('test 1', () => {
  expect(reverse(123)).toBe(321)
})

test('test 2', () => {
  expect(reverse(-123)).toBe(-321)
})

test('test 3', () => {
  expect(reverse(120)).toBe(21)
})

test('test 4', () => {
  expect(reverse(0)).toBe(0)
})
