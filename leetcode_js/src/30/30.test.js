require('../utils/expect')
const { expect, test } = require('@jest/globals')
const { findSubstring } = require('./30')

test('test 1', () => {
  expect(findSubstring('barfoothefoobarman', ['foo', 'bar'])).toMatchSet([0, 9])
})

test('test 2', () => {
  expect(
    findSubstring('wordgoodgoodgoodbestword', ['word', 'good', 'best', 'word'])
  ).toMatchSet([])
})
