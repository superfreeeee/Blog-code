const { log, group } = require('../utils')

const path = require('path')

group('path attributes', () => {
  log(Reflect.ownKeys(path))
})

const modules = [
  'basename',
  'delimiter',
  'dirname',
  'extname',
  'format',
  'isAbsolute',
  'join',
  'normalize',
  'parse',
  'posix_win32',

  'relative',
  'resolve',
  'sep',
  'toNamespacedPath',
]

modules.forEach((name) => {
  require(`./${name}`)
})
