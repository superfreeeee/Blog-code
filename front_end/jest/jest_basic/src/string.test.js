test('I not in time', () => {
  expect('time').not.toMatch(/I/)
  expect('time').toMatch(/.*/)
  expect('time').toMatch(/^t/)
})

test('stop is in Christoph', () => {
  expect('Christoph').toMatch(/stop/)
})
