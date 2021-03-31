const f1 = function (a, b, c) {
  return [a, b, c]
}

const f2 = (a) => (b) => (c) => [a, b, c]

module.exports = { f1, f2 }
