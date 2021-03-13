const { expect, test } = require('@jest/globals')
const { romanToInt } = require('./13')

test('test 1', () => {
  expect(romanToInt('III')).toBe(3)
})

test('test 2', () => {
  expect(romanToInt('IV')).toBe(4)
})

test('test 3', () => {
  expect(romanToInt('IX')).toBe(9)
})

test('test 4', () => {
  expect(romanToInt('LVIII')).toBe(58)
})

test('test 5', () => {
  expect(romanToInt('MCMXCIV')).toBe(1994)
})
