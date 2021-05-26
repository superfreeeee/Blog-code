const { log, group } = require('../utils')

const path = require('path')

/* 返回相对路径 */
group('path.relative(from, to)', () => {
  log(`path.relative('/a/b/c', '/c/d/e'):    ${path.relative('/a/b/c', '/c/d/e')}`)
  log(`path.relative('/a/b/c', '/a/b/c/d'):  ${path.relative('/a/b/c', '/a/b/c/d')}`)
  log(`path.relative('./a/b/c', '/a/b/c/d'): ${path.relative('./a/b/c', '/a/b/c/d')}`)
})
