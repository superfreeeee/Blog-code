const dayjs = require('dayjs')
const { log, group } = require('../utils/group')
const isBetween = require('dayjs/plugin/isBetween')
const isLeapYear = require('dayjs/plugin/isLeapYear')

dayjs.extend(isBetween)
dayjs.extend(isLeapYear)

group('day.js query', () => {
  const earlyOne = dayjs('2020-01-01 05')
  const laterOne = dayjs('2020-01-01 12')
  const middleOne = dayjs('2020-01-01 08')

  log(`earlyOne:   ${earlyOne}`)
  log(`laterOne:   ${laterOne}`)
  log(`middleOne:  ${middleOne}`)

  group('isBefore', () => {
    log(`earlyOne.isBefore(laterOne):  ${earlyOne.isBefore(laterOne)}`)
    log(`laterOne.isBefore(earlyOne):  ${laterOne.isBefore(earlyOne)}`)
    log(`earlyOne.isBefore(earlyOne):  ${earlyOne.isBefore(earlyOne)}`)
  })

  group('isSame', () => {
    log(`earlyOne.isSame(laterOne):  ${earlyOne.isSame(laterOne)}`)
    log(`laterOne.isSame(earlyOne):  ${laterOne.isSame(earlyOne)}`)
    log(`earlyOne.isSame(earlyOne):  ${earlyOne.isSame(earlyOne)}`)
  })

  group('isAfter', () => {
    log(`earlyOne.isAfter(laterOne):  ${earlyOne.isAfter(laterOne)}`)
    log(`laterOne.isAfter(earlyOne):  ${laterOne.isAfter(earlyOne)}`)
    log(`earlyOne.isAfter(earlyOne):  ${earlyOne.isAfter(earlyOne)}`)
  })

  group('isBetween', () => {
    log(`middleOne.isBetween(earlyOne, laterOne):  ${middleOne.isBetween(earlyOne, laterOne)}`)
    log(`middleOne.isBetween(laterOne, earlyOne):  ${middleOne.isBetween(laterOne, earlyOne)}`)
  })

  group('isLeapYear', () => {
    log(`dayjs('1600').isLeapYear():  ${dayjs('1600').isLeapYear()}`)
    log(`dayjs('1800').isLeapYear():  ${dayjs('1800').isLeapYear()}`)
    log(`dayjs('2000').isLeapYear():  ${dayjs('2000').isLeapYear()}`)
    log(`dayjs('2020').isLeapYear():  ${dayjs('2020').isLeapYear()}`)
  })
})