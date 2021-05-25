const log = console.log

const group = (tag, cb) => {
  console.group(tag)
  cb()
  console.groupEnd()
}

module.exports = {
  log,
  group,
}
