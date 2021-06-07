define(function (require, exports) {
  exports.f = function f() {
    console.log('invoke function f from cjs.js')
  }

  exports.g = function g() {
    console.log('invoke function g from cjs.js')
  }
})
