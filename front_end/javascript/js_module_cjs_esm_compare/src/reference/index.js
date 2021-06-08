import { log, group } from '../utils'

let { a, fa, oa, foa } = require('./other_with_commonjs')

group('commonjs', () => {
  fa()
  log(`current a = ${a}`)

  log('\n>>> invoke a *= 10\n'), (a *= 10)

  fa()
  log(`current a = ${a}`)

  log()

  foa()
  log(`current oa = `, oa)

  log('\n>>> invoke oa.a *= 10\n'), (oa.a *= 10)

  foa()
  log(`current oa = `, oa)
})

import { b, fb, setb, ob, fob } from './other_with_es6'

group('esm', () => {
  fb()
  log(`current b = ${b}`)

  // b *= 10;  // import b is read-only
  setb()

  fb()
  log(`current b = ${b}`)

  log()

  fob()
  log(`current ob = `, ob)

  log('\n>>> invoke ob.b *= 10\n'), (ob.b *= 10)

  fob()
  log(`current ob = `, ob)
})
