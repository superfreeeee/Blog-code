const { log, group } = require('../utils')

const path = require('path')

/* 按对象构建文件名 */
group('path.format(pathObj)', () => {
  log(
    `path.format({ root: 'ignored', dir: '/dir', base: 'base.txt' }):             ${path.format({
      root: 'ignored',
      dir: '/dir',
      base: 'base.txt',
    })}`
  ) // 有 dir 时忽略 root
  log(
    `path.format({ root: '/root' + path.sep, base: 'base.txt', ext: 'ignored' }): ${path.format({
      root: '/root' + path.sep,
      base: 'base.txt',
      ext: 'ignored',
    })}`
  ) // 用 root 时不添加分隔符(自己加)，并忽略 ext
  log(
    `path.format({ dir: '/dir', name: 'name', ext: '.txt' }):                     ${path.format({
      dir: '/dir',
      name: 'name',
      ext: '.txt',
    })}`
  ) // 没有 base 时使用 name + ext
})
