const dayjs = require('dayjs')
const { log, group } = require('../utils/group')

group('day.js get/set', () => {
  const origin = dayjs('2021-11-01 23:59:59.699')

  let time = origin.clone()

  group('second', () => {
    log(`time:              ${time}`)
    log(`time.second():     ${time.second()}`)
    log(`time.second(996):  ${time.second(30)}`)
    log(`time.second():     ${time.second()}`)
  })

  group('hour', () => {
    log(`time:          ${time}`)
    log(`time.hour():   ${time.hour()}`)
    log(`time.hour(1):  ${time.hour(1)}`)
    log(`time.hour():   ${time.hour()}`)
  })

  time = origin.clone()

  group('get/set', () => {
    log(`current time:             ${time}`)
    log(`time.get('year'):         ${time.get('year')}`)
    log(`time.get('month'):        ${time.get('month')}`)
    log(`time.get('date'):         ${time.get('date')}`)
    log(`time.get('day'):          ${time.get('day')}`)
    log(`time.get('hour'):         ${time.get('hour')}`)
    log(`time.get('minute'):       ${time.get('minute')}`)
    log(`time.get('second'):       ${time.get('second')}`)
    log(`time.get('millisecond'):  ${time.get('millisecond')}`)

    log(`time.set('year', 2022):      ${time = time.set('year', 2022)}`)
    log(`time.set('month', 0):        ${time = time.set('month', 0)}`)
    log(`time.set('date', 13):        ${time = time.set('date', 13)}`)
    log(`time.set('day', 1):          ${time = time.set('day', 1)}`)
    log(`time.set('hour', 1):         ${time = time.set('hour', 1)}`)
    log(`time.set('minute', 3):       ${time = time.set('minute', 3)}`)
    log(`time.set('second', 5):       ${time = time.set('second', 5)}`)
    log(`time.set('millisecond', 7):  ${time = time.set('millisecond', 7)}`)
  })
})