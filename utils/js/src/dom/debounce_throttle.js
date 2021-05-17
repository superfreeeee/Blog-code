// 防抖
export function debounce(cb, ms) {
  let timer = null
  const self = this
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb.apply(self, args)
    }, ms)
  }
}

// 节流
export function throttle(cb, ms) {
  let valid = true
  const self = this
  return (...args) => {
    if (!valid) return
    valid = false
    setTimeout(() => {
      cb.apply(self, args)
      valid = true
    }, ms)
  }
}
