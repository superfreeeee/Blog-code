const { expect, test } = require('@jest/globals')
const { intToRoman } = require('./12')

test('test 1', () => {
  expect(intToRoman(3)).toBe('III')
})

test('test 2', () => {
  expect(intToRoman(4)).toBe('IV')
})

test('test 3', () => {
  expect(intToRoman(9)).toBe('IX')
})

test('test 4', () => {
  expect(intToRoman(58)).toBe('LVIII')
})

test('test 5', () => {
  expect(intToRoman(1994)).toBe('MCMXCIV')
})
