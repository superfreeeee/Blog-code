// unbind
function uncurryingByCall(fn) {
  return function (ctx, ...args) {
    return fn.call(ctx, ...args)
  }
}

function uncurryingByApply(fn) {
  return function (ctx, ...args) {
    return fn.apply(ctx, args)
  }
}

function uncurryingByReflect(fn) {
  return (ctx, ...args) => Reflect.apply(fn, ctx, args)
}

module.exports = {
  uncurryingByCall,
  uncurryingByApply,
  uncurryingByReflect,
}
