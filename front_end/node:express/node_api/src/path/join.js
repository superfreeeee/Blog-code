const { log, group } = require('../utils')

const path = require('path')

/* 合成路径 */
group('path.join(...paths)', () => {
  log(`path.join('a', 'b', 'c/d', '..', 'e'):  ${path.join('a', 'b', 'c/d', '..', 'e')}`) // 使用相对路径
  log(`path.join('/a', 'b', 'c/d', '..', 'e'): ${path.join('/a', 'b', 'c/d', '..', 'e')}`) // 使用绝对路径
  log(`path.join():                            ${path.join()}`) // 默认为当前目录 .
})
