import { log, group } from './utils'

log('>>> basic.js')

group('constructor', () => {
  log(`/abc/g                :`, /abc/g)
  log(`new RegExp('abc', 'g'):`, new RegExp('abc', 'g'))
})

group('measure', () => {
  const str = '1234567890'
  log(`str: ${str}`)
  log(`str.match(/\\d/)     :`, str.match(/\d/))
  log(`str.match(/\\d+/)    :`, str.match(/\d+/))
  log(`str.match(/\\d*/)    :`, str.match(/\d*/))
  log(`str.match(/\\d?/)    :`, str.match(/\d?/))
  log(`str.match(/\\d{3}/)  :`, str.match(/\d{3}/))
  log(`str.match(/\\d{3,5}/):`, str.match(/\d{3,5}/))
  log(`str.match(/\\d{3,}/) :`, str.match(/\d{3,}/))
  log(`str.match(/\\d{3}$/) :`, str.match(/\d{3}$/))
  log(`str.match(/^\\d{3}/) :`, str.match(/^\d{3}/))
})

group('characters', () => {
  const str = 'abcdefghijklmnopqrstuvwxyz1234567890\t \0:?><!@#$%^&*()_+,./'
  log(`str: ${str}`)
  log(`str.match(/abc/):`, str.match(/abc/))
  log(`str.match(/cde/):`, str.match(/cde/))
  log(`str.match(/\\w+/):`, str.match(/\w+/))
  log(`str.match(/\\W+/):`, str.match(/\W+/))
  log(`str.match(/\\d+/):`, str.match(/\d+/))
  log(`str.match(/\\D+/):`, str.match(/\D+/))
  log(`str.match(/\\s+/):`, str.match(/\s+/))
  log(`str.match(/\\S+/):`, str.match(/\S+/))
})

group('options', () => {
  const str = '1234567890'
  log(`str: ${str}`)
  log(`str.match(/123/)        :`, str.match(/123/))
  log(`str.match(/[123]/)      :`, str.match(/[123]/))
  log(`str.match(/[123]+/)     :`, str.match(/[123]+/))
  log(`str.match(/[^123]/)     :`, str.match(/[^123]/))
  log(`str.match(/[5-9]+/)     :`, str.match(/[5-9]+/))
  log(`str.match(/(345|789)+/g):`, str.match(/(345|789)+/g))
})

group('modifiers', () => {
  const str = '0123456789\nabcdeABCDE'
  log(`str: ${str}`)
  log(str.match(/\d{3}/))
  log(str.match(/\d{3}/g))
  log(str.match(/[a-z]{2}/g))
  log(str.match(/[a-z]{2}/gi))
  log(str.match(/^[a-z]+/))
  log(str.match(/^[a-z]+/m))
})
