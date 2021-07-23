export const group = (tag: string, cb: () => void) => {
  console.group(tag)
  cb()
  console.groupEnd()
}
