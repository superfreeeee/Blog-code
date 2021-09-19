"use strict";

var _observable = _interopRequireDefault(require("../observable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var obj = (0, _observable["default"])({
  name: 'Jason'
});
console.log('obj', obj);
obj.subscribe(function (obj) {
  console.log('on obj update', obj);
});
obj.name = 'Jack';