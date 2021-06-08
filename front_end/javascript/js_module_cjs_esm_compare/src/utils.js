export const log = console.log

export const group = async (tag, cb) => {
  console.group(tag)
  cb()
  console.groupEnd()
}
