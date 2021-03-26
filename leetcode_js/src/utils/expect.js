expect.extend({
  toMatchSet(actual, expected) {
    if (actual.length !== expected.length) {
      return {
        pass: false,
        message: () =>
          `expected length: ${expected.length}, actual length: ${actual.length}`,
      }
    }
    actual.sort()
    expected.sort()
    const n = actual.length
    for (let i = 0; i < n; i++) {
      if (actual[i] !== expected[i]) {
        return {
          pass: false,
          message: () => `values not match`,
        }
      }
    }
    return {
      pass: true,
      message: () => '',
    }
  },
})
