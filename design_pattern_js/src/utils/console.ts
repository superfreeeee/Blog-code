export const log = console.log

export const group = (tag: string, cb?: Function) => {
  console.group(tag)
  cb && cb()
  console.groupEnd()
}
