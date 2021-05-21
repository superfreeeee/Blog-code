const emptyFn = () => {}

const log = console.log

function group(name, cb = emptyFn) {
  console.group(name)
  cb()
  console.groupEnd()
}

module.exports = {
  log,
  group,
}
