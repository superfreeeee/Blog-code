define(function (_, exports, module) {
  exports.a = 123
  exports.b = 456

  console.group('other2.js')
  console.log('module', module)
  console.log('module.exports', module.exports)
  console.groupEnd()
})
