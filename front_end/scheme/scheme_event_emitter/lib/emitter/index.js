"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 事件触发器
 * E 为事件类型，默认 string
 * T 为传递数据类型，默认为 void
 */
var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    _defineProperty(this, "listenersMap", null);
  }

  _createClass(EventEmitter, [{
    key: "ensureListenersMap",
    value: function ensureListenersMap(event) {
      if (!this.listenersMap) {
        this.listenersMap = new Map();
      }

      if (!this.listenersMap.has(event)) {
        this.listenersMap.set(event, new Set());
      }
    }
  }, {
    key: "on",
    value: function on(event, listener) {
      this.ensureListenersMap(event);
      var listeners = this.listenersMap.get(event);

      if (!listeners.has(listener)) {
        listeners.add(listener);
      }
    }
  }, {
    key: "off",
    value: function off(event, listener) {
      if (this.listenersMap.has(event)) {
        var listeners = this.listenersMap.get(event);

        if (listeners.has(listener)) {
          listeners["delete"](listener);
        }
      }
    }
  }, {
    key: "emit",
    value: function emit(event, param) {
      if (this.listenersMap.has(event)) {
        var listeners = this.listenersMap.get(event);
        listeners.forEach(function (listener) {
          listener(param);
        });
      }
    }
  }, {
    key: "once",
    value: function once(event, listener) {
      var _this = this;

      var wrappedListener = function wrappedListener(param) {
        listener(param);

        _this.off(event, wrappedListener);
      };

      this.on(event, wrappedListener);
    }
  }]);

  return EventEmitter;
}();

var _default = EventEmitter;
exports["default"] = _default;