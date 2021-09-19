"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _emitter = _interopRequireDefault(require("../emitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 创建一个可观察对象
 * 内部使用 Proxy 代理
 * @param obj
 * @returns
 */
var createObservable = function createObservable(obj) {
  var ON_DATA_UPDATE = 'ON_DATA_UPDATE';
  var emitter = new _emitter["default"]();
  var proxy = new Proxy(Object.assign(obj, {
    subscribe: function subscribe(listener) {
      emitter.on(ON_DATA_UPDATE, listener);
    }
  }), {
    set: function set(target, propKey, value, receiver) {
      var res = Reflect.set(target, propKey, value, receiver);
      emitter.emit(ON_DATA_UPDATE, target);
      return res;
    }
  });
  return proxy;
};

var _default = createObservable;
exports["default"] = _default;