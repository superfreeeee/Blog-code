function currying(fn) {
  const len = fn.length
  const params = []
  const inner = (...args) => {
    args.forEach((arg) => params.push(arg))
    if (params.length >= len) {
      const res = fn(...params.slice(0, len))
      params.length = 0
      return res
    } else {
      return inner
    }
  }
  return inner
}

function curryingInfinite(fn) {
  const params = []
  const inner = (...args) => {
    if (args.length === 0) {
      const res = fn(...params)
      params.length = 0
      return res
    } else {
      args.forEach((arg) => params.push(arg))
      return inner
    }
  }
  return inner
}

function curriedAdder() {
  let sum = 0
  const inner = (...nums) => {
    if (nums.length === 0) {
      return sum
    } else {
      nums.forEach((num) => (sum += num))
      return inner
    }
  }
  return inner
}

module.exports = { currying, curryingInfinite, curriedAdder }
