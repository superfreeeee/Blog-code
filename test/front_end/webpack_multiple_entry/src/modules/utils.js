export const log = console.log

export const group = (name, cb) => {
  console.group(name)
  cb()
  console.groupEnd()
}
