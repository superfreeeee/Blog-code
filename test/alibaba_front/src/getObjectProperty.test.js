const { expect, test } = require('@jest/globals')
const { get } = require('./getObjectProperty')

test('test 1', () => {
  expect(get({ a: 1 }, 'a')).toBe(1)
})

test('test 2', () => {
  expect(get({ a: [1, { b: 2 }] }, 'a[1].b')).toBe(2)
})
