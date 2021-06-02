export const group = (tag, cb) => {
  console.group(tag)
  cb()
  console.groupEnd()
}

export const log = console.log
