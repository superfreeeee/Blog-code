const { expect, test } = require('@jest/globals')
const { letterCombinations } = require('./17')

test('test 1', () => {
  expect(letterCombinations('23')).toMatchObject([
    'ad',
    'ae',
    'af',
    'bd',
    'be',
    'bf',
    'cd',
    'ce',
    'cf',
  ])
})

test('test 2', () => {
  expect(letterCombinations('')).toMatchObject([])
})

test('test 3', () => {
  expect(letterCombinations('2')).toMatchObject(['a', 'b', 'c'])
})
