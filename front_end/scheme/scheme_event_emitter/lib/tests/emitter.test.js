"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventEmitterEvent = void 0;

var _emitter = _interopRequireDefault(require("../emitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EventEmitterEvent;
exports.EventEmitterEvent = EventEmitterEvent;

(function (EventEmitterEvent) {
  EventEmitterEvent["EventA"] = "EventA";
  EventEmitterEvent["EventB"] = "EventB";
})(EventEmitterEvent || (exports.EventEmitterEvent = EventEmitterEvent = {}));

var emitter = new _emitter["default"]();

var listenerA1 = function listenerA1() {
  console.log('listenerA1 listen for EventEmitterEvent.EventA');
};

var listenerA2 = function listenerA2() {
  console.log('listenerA2 listen for EventEmitterEvent.EventA');
};

var listenerB1 = function listenerB1() {
  console.log('listenerB1 listen for EventEmitterEvent.EventB');
};

var listenerB2 = function listenerB2() {
  console.log('listenerB2 listen for EventEmitterEvent.EventB');
};

console.group('>>>>> group 1');
emitter.on(EventEmitterEvent.EventA, listenerA1);
console.log('[log] on listenerA1');
emitter.on(EventEmitterEvent.EventA, listenerA2);
console.log('[log] on listenerA2');
emitter.on(EventEmitterEvent.EventB, listenerB1);
console.log('[log] on listenerB');
emitter.once(EventEmitterEvent.EventB, listenerB2);
console.log('[log] once listenerB2');
console.log('emitter info', emitter);
console.log('[log] invoke EventA');
emitter.emit(EventEmitterEvent.EventA);
console.log('[log] invoke EventB');
emitter.emit(EventEmitterEvent.EventB);
console.log('emitter info', emitter);
console.groupEnd();
console.group('>>>>> group 2');
emitter.off(EventEmitterEvent.EventA, listenerA1);
console.log('[log] off listenerA1');
console.log('emitter info', emitter);
console.log('[log] invoke EventA');
emitter.emit(EventEmitterEvent.EventA);
console.log('[log] invoke EventB');
emitter.emit(EventEmitterEvent.EventB);
console.groupEnd();