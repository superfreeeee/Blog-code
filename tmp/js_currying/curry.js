function abc(a, b, c) {
  return [a, b, c]
}

function curry(cb) {
  const len = cb.length
  let params = []
  const inner = (...args) => {
    args.forEach((arg) => params.push(arg))
    if (params.length >= len) {
      const res = cb(...params.slice(0, len))
      params = []
      return res
    } else {
      return inner
    }
  }
  return inner
}

const curried = curry(abc)
console.log(curried(1)(2)(3)) // => [1, 2, 3]
console.log(curried(1, 2)(3)) // => [1, 2, 3]
console.log(curried(1, 2, 3)) // => [1, 2, 3]
