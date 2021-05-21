const dayjs = require('dayjs')
const { log, group } = require('../utils/group')
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime)

group('day.js format', () => {
  let earlyTime = dayjs([2020, 1, 1])
  const origin = dayjs()
  let time = origin.clone()

  log(`earlyTime:  ${earlyTime}`)
  log(`time:       ${time}`)

  group('format', () => {
    log(`time.format():                       ${time.format()}`)
    log(`time.format('YYYY-MM-DD'):           ${time.format('YYYY-MM-DD')}`)
    log(`time.format('YYYY.MM.DD HH:mm:ss'):  ${time.format('YYYY.MM.DD HH:mm:ss')}`)
  })

  group('from', () => {
    log(`time.from(earlyTime):        ${time.from(earlyTime)}`)
    log(`time.from(earlyTime, true):  ${time.from(earlyTime, true)}`)
  })

  group('diff', () => {
    log(`time.subtract(earlyTime).valueOf():  ${time.subtract(earlyTime).valueOf()}`)
    time = origin.clone()
    log(`time.diff(earlyTime):                ${time.diff(earlyTime)}`)
    log(`typeof time.subtract(earlyTime):     ${typeof time.subtract(earlyTime)}`)
    log(`typeof time.diff(earlyTime):         ${typeof time.diff(earlyTime)}`)
  })

  group('unix/valueOf', () => {
    time = origin.clone()
    log(`time.subtract(earlyTime).unix():     ${time.subtract(earlyTime).unix()}`)
    time = origin.clone()
    log(`time.subtract(earlyTime).valueOf():  ${time.subtract(earlyTime).valueOf()}`)
  })
})