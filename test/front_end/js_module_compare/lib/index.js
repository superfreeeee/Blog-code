"use strict";

var _other_with_es = require("./other_with_es6");

// import React from 'react'
// const React2 = require('react')
// console.log(React)
// console.log(React2)
// import { a, b, c } from './other'
// import Other from './other'
// console.log(a, b, c)
// console.log(Other)
var _require = require('./other_with_commonjs'),
    a = _require.a,
    fa = _require.fa,
    oa = _require.oa,
    foa = _require.foa;

fa();
a *= 10;
fa();
console.log("current a = ".concat(a));
foa();
oa.a *= 10;
foa();
console.log("current oa = ", oa);
(0, _other_with_es.fb)(); // b *= 10

(0, _other_with_es.fb)();
console.log("current b = ".concat(_other_with_es.b));
(0, _other_with_es.fob)();
_other_with_es.ob.b *= 10;
(0, _other_with_es.fob)();
console.log("current ob = ", _other_with_es.ob);