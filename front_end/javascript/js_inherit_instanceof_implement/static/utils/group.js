function group(msg, cb) {
  console.group(msg)
  cb()
  console.groupEnd()
}
