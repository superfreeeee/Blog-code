import { log, group } from './utils'

log('>>> advance.js')

group('matcher', () => {
  const html = '<div></div>'
  const tagPattern = /<(\w+)><\/\1>/

  log(`html:`, html)
  log(`tagPattern:`, tagPattern)
  log(`html.match(tagPattern):`, html.match(tagPattern))
})

group('uncaught', () => {
  const string = '1234567890'

  log(`string:`, string)

  const caughtPattern = /(\d{3})\d{3}/
  log(`caughtPattern:`, caughtPattern)
  log(`string.match(caughtPattern):`, string.match(caughtPattern))

  const uncaughtPattern = /(?:\d{3})\d{3}/
  log(`uncaughtPattern:`, uncaughtPattern)
  log(`string.match(uncaughtPattern):`, string.match(uncaughtPattern))
})

group('look ahead assertion', () => {
  const str = 'abcde12345fghij67890'
  log(`str:`, str)

  const uncaughtPattern = /[a-z]{5}(?:1)/
  log(str.match(uncaughtPattern))

  const positiveAssertionPattern = /[a-z]{5}(?=1)/
  log(str.match(positiveAssertionPattern))

  const negativeAssertionPattern = /[a-z]{5}(?!1)/
  log(str.match(negativeAssertionPattern))

  const negativeAssertionPattern2 = /[a-z]+(?!1)/
  log(str.match(negativeAssertionPattern2))
})

group('look behind assertion', () => {
  const str = 'abcde12345fghij67890'
  log(`str:`, str)

  const positiveLookAheadAssertionPattern = /(?=e)\d{5}/
  log(str.match(positiveLookAheadAssertionPattern))

  const positiveLookBehindAssertionPattern = /(?<=e)\d{5}/
  log(str.match(positiveLookBehindAssertionPattern))

  const negativeLookBehindAssertionPattern = /(?<!e)\d{5}/
  log(str.match(negativeLookBehindAssertionPattern))
})
