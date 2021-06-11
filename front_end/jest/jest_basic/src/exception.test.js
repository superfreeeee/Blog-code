function f() {
  throw new Error('My Error')
}

test('toThrow', () => {
  expect(f).toThrow()
  expect(f).toThrow(Error)
  expect(f).not.toThrow('dont contain this message')
  expect(f).toThrow(/Error/)
})
