const fs = require('fs')

function getCodeSync(path) {
  return fs.readFileSync(path).toString()
}

module.exports = {
  getCodeSync,
}
