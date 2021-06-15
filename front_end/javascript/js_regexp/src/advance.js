import { log, group } from './utils'

log('>>> advance.js')

group('reverse reference', () => {
  const html = '<div></div>'
  const tagPattern = /<(\w+)><\/\1>/

  log(`html                  :`, html)
  log(`tagPattern            :`, tagPattern)
  log(`html.match(tagPattern):`, html.match(tagPattern))
})

group('non-greedy', () => {
  const str = 'abcde1234567890'
  log(`str:`, str)

  log(`str.match(/\\d+\\d{5}/) :`, str.match(/\d+\d{5}/))
  log(`str.match(/\\d+?\\d{5}/):`, str.match(/\d+?\d{5}/))
  log(`str.match(/\\d*\\d{5}/) :`, str.match(/\d*\d{5}/))
  log(`str.match(/\\d*?\\d{5}/):`, str.match(/\d*?\d{5}/))
  log(`str.match(/\\d?\\d{5}/) :`, str.match(/\d?\d{5}/))
  log(`str.match(/\\d??\\d{5}/):`, str.match(/\d??\d{5}/))
  log(`str.match(/[a-z]+\\d{5}/) :`, str.match(/[a-z]+\d{5}/))
  log(`str.match(/[a-z]+?\\d{5}/):`, str.match(/[a-z]+?\d{5}/))
  log(`str.match(/[a-z]*\\d{5}/) :`, str.match(/[a-z]*\d{5}/))
  log(`str.match(/[a-z]*?\\d{5}/):`, str.match(/[a-z]*?\d{5}/))
  log(`str.match(/[a-z]?\\d{5}/) :`, str.match(/[a-z]?\d{5}/))
  log(`str.match(/[a-z]??\\d{5}/):`, str.match(/[a-z]??\d{5}/))
})

group('uncaught', () => {
  const string = '1234567890'

  log(`string:`, string)

  const caughtPattern = /(\d{3})\d{3}/
  log(`caughtPattern              :`, caughtPattern)
  log(`string.match(caughtPattern):`, string.match(caughtPattern))

  const uncaughtPattern = /(?:\d{3})\d{3}/
  log(`uncaughtPattern              :`, uncaughtPattern)
  log(`string.match(uncaughtPattern):`, string.match(uncaughtPattern))
})

group('look ahead assertion', () => {
  const str = 'abcde12345fghij67890'
  log(`str:`, str)

  const uncaughtPattern = /[a-z]{5}(?:1)/
  log(`uncaughtPattern           :`, uncaughtPattern)
  log(`str.match(uncaughtPattern):`, str.match(uncaughtPattern))

  const positiveAssertionPattern = /[a-z]{5}(?=1)/
  log(`positiveAssertionPattern           :`, positiveAssertionPattern)
  log(
    `str.match(positiveAssertionPattern):`,
    str.match(positiveAssertionPattern)
  )

  const negativeAssertionPattern = /[a-z]{5}(?!1)/
  log(`negativeAssertionPattern           :`, negativeAssertionPattern)
  log(
    `str.match(negativeAssertionPattern):`,
    str.match(negativeAssertionPattern)
  )

  const negativeAssertionPattern2 = /[a-z]+(?!1)/
  log(`negativeAssertionPattern2           :`, negativeAssertionPattern2)
  log(
    `str.match(negativeAssertionPattern2):`,
    str.match(negativeAssertionPattern2)
  )
})

group('look behind assertion', () => {
  const str = 'abcde12345fghij67890'
  log(`str:`, str)

  const positiveLookAheadAssertionPattern = /(?=e)\d{5}/
  log(
    `positiveLookAheadAssertionPattern           :`,
    positiveLookAheadAssertionPattern
  )
  log(
    `str.match(positiveLookAheadAssertionPattern):`,
    str.match(positiveLookAheadAssertionPattern)
  )

  const positiveLookBehindAssertionPattern = /(?<=e)\d{5}/
  log(
    `positiveLookBehindAssertionPattern           :`,
    positiveLookBehindAssertionPattern
  )
  log(
    `str.match(positiveLookBehindAssertionPattern):`,
    str.match(positiveLookBehindAssertionPattern)
  )

  const negativeLookBehindAssertionPattern = /(?<!e)\d{5}/
  log(
    `negativeLookBehindAssertionPattern           :`,
    negativeLookBehindAssertionPattern
  )
  log(
    `str.match(negativeLookBehindAssertionPattern):`,
    str.match(negativeLookBehindAssertionPattern)
  )
})
