import fs from 'fs'

const path = __dirname
const self = __filename.substring(__dirname.length + 1)
console.log(path)
console.log(self)

fs.readdirSync(path).map(name => {
  if (name === self) return
  const pos = name.lastIndexOf('.')
  const prefix = name.substring(0, pos)
  const postfix = name.substring(pos + 1)
  console.log(`file: prefix=${prefix}, postfix=${postfix}`)
})