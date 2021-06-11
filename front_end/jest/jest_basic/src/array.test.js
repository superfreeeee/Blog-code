test('toContain', () => {
  const arr = ['123', '456', '789']
  expect(arr).toContain('123')
  expect(arr).not.toContain('000')
  expect(new Set(arr)).not.toContain('000')

  const objList = [{ a: 1 }]
  expect(objList).not.toContain({ a: 1 })
})
