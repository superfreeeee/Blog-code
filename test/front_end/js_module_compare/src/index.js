// import React from 'react'

// const React2 = require('react')

// console.log(React)
// console.log(React2)

// import { a, b, c } from './other'
// import Other from './other'

// console.log(a, b, c)
// console.log(Other)

let { a, fa, oa, foa } = require('./other_with_commonjs')

fa()
a *= 10
fa()
console.log(`current a = ${a}`)
foa()
oa.a *= 10
foa()
console.log(`current oa = `, oa)

import { b, fb, ob, fob } from './other_with_es6'

fb()
b *= 10
fb()
console.log(`current b = ${b}`)
fob()
ob.b *= 10
fob()
console.log(`current ob = `, ob)
