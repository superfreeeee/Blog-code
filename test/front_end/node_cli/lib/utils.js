const { readFileSync, writeFileSync } = require('fs')

const format = (s, len) => {
  return s.length >= len ? s : `${' '.repeat(len - s.length)}${s}`
}

const getTemplate = (path, json = false) => {
  const res = readFileSync(path, { encoding: 'utf-8' })
  return json ? JSON.parse(res) : res
}

const saveFile = (path, content) => {
  console.log(path, content)
  writeFileSync(path, JSON.stringify(content), { encoding: 'utf-8' })
}

module.exports = {
  format,
  getTemplate,
  saveFile,
}
