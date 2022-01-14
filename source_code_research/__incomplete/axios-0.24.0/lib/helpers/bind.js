'use strict';

/**
 * fn.apply(thisArg)
 * 其实差不多就是封装 Function.prototype.bind 方法
 * @param {*} fn 
 * @param {*} thisArg 
 * @returns 
 */
// ? Read
module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
