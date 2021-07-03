const path = require('path')

const rootPath = __dirname
const templatesPath = path.join(rootPath, 'templates')
const currentPath = path.resolve('./')

module.exports = {
  rootPath,
  templatesPath,
  currentPath,
}
