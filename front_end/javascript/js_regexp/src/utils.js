export const log = console.log

export const group = (tag, cb = () => {}) => {
  console.group(tag)
  cb()
  console.groupEnd()
}
