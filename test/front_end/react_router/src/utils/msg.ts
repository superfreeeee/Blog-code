export const group = (tag: string, cb: Function) => {
  console.group(tag)
  cb()
  console.groupEnd()
}
