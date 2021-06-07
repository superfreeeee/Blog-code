/**
 * * default modules
 */
define(function (require, exports, module) {
  console.group('index.js')
  // console.log('require', require)
  // console.log('exports', exports)
  // console.log('module', module)
  // console.log('module.exports === exports', module.exports === exports)

  const other2 = require('js/other2.js')
  console.log('other2', other2)
  console.groupEnd()
})
