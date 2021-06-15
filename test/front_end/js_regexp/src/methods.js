import { log, group } from './utils'

log('>>> methods.js')

const reg_a = /^a/
log('reg_a:', reg_a)

group('RegExp.prototype.test(string)', () => {
  log(`reg_a.test('12345'):`, reg_a.test('12345'))
  log(`reg_a.test('12a45'):`, reg_a.test('12a45'))
  log(`reg_a.test('a1245'):`, reg_a.test('a1245'))
})

group('RegExp.prototype.exec(string)', () => {
  log(`reg_a.exec('12345'):`, reg_a.exec('12345'))
  log(`reg_a.exec('12a45'):`, reg_a.exec('12a45'))
  log(`reg_a.exec('a1245'):`, reg_a.exec('a1245'))
})

group('String.prototype.match(regexp)', () => {
  log(`'12345'.match(/^a/):`, '12345'.match(/^a/))
  log(`'12a45'.match(/^a/):`, '12a45'.match(/^a/))
  log(`'a1245'.match(/^a/):`, 'a1245'.match(/^a/))
  log(`'a1245'.match('^a'):`, '1^a45'.match('^a'))
  log(`'a1245'.match('^a.'):`, 'a1245'.match('^a.'))
  log(`'a.245'.match('^a\\.'):`, 'a.245'.match('^a\\.'))
})

group('String.prototype.search(regexp | string)', () => {
  log(`'12345'.search(/a/):`, '12345'.search(/a/))
  log(`'12a45'.search(/a/):`, '12a45'.search(/a/))
  log(`'a1245'.search(/a/):`, 'a1245'.search(/a/))
})

group('String.prototype.replace(regexp | string, string)', () => {
  log(`'12345'.replace(/a/, 'xxx'):`, '12345'.replace(/a/, 'xxx'))
  log(`'12a45'.replace(/a/, 'xxx'):`, '12a45'.replace(/a/, 'xxx'))
  log(`'a1245'.replace(/a/, 'xxx'):`, 'a1245'.replace(/a/, 'xxx'))
})

group('String.prototype.split(regexp | string)', () => {
  log(`'12345'.split(/a/):`, '12345'.split(/a/))
  log(`'12a45'.split(/a/):`, '12a45'.split(/a/))
  log(`'a1245'.split(/a/):`, 'a1245'.split(/a/))
})
