const wrapper = function (fn, catcher) {
  return (params) =>
    new Promise((resolve, reject) => {
      try {
        resolve(fn(params))
      } catch (e) {
        reject(catcher(e))
      }
    })
}
