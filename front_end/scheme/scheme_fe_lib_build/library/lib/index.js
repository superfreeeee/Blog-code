"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.funcB = exports.funcA = void 0;

var modA_1 = require("./modA");

Object.defineProperty(exports, "funcA", {
  enumerable: true,
  get: function get() {
    return modA_1.funcA;
  }
});

var modB_1 = require("./modB");

Object.defineProperty(exports, "funcB", {
  enumerable: true,
  get: function get() {
    return modB_1.funcB;
  }
});

function greeting() {
  console.log('Hello World by @youxian/cli');
}

exports["default"] = greeting;