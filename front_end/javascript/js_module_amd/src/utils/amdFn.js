define(function () {
  function f() {
    console.log('invoke function f from amdFn.js')
  }

  function g() {
    console.log('invoke function g from amdFn.js')
  }

  return {
    f,
    g,
  }
})
