const moment = require('moment')
const { log, group } = require('../utils/group')

group('moment.js operate', () => {
  const origin = moment('2019-11-01 23:59:59.699')

  let time = origin.clone()
  group('add', () => {
    log(`current time:            ${time}`)
    log(`time.add(365, 'days'):   ${time.add(365, 'days')}`)
    log(`reset time:              ${time.set('year', 2019)}`)
    log(`time.add(1, 'years'):    ${time.add(1, 'years')}`)
    log(`time.add(8, 'd'):        ${time.add(8, 'd')}`)
    log(`time.add({ days: 7 }):   ${time.add({ days: 7 })}`)
  })

  time = origin.clone().year(2020)
  group('subtract', () => {
    log(`current time:                ${time}`)
    log(`time.subtract(365, 'days'):  ${time.subtract(365, 'days')}`)
    log(`reset time:                  ${time.year(2020).date(1)}`)
    log(`time.subtract(1, 'years'):   ${time.subtract(1, 'years')}`)
  })

  group('startOf/endOf', () => {
    time = moment('2019-01-01 01:30:30.333')
    log(`time:                    ${time}`)
    log(`time.startOf('minute'):  ${time.clone().startOf('minute')}`)
    log(`time.startOf('hour'):    ${time.clone().startOf('hour')}`)

    log(`time:                  ${time}`)
    log(`time.endOf('minute'):  ${time.clone().endOf('minute')}`)
    log(`time.endOf('hour'):    ${time.clone().endOf('hour')}`)
  })

  group('max/min', () => {
    const laterOne = moment('2020-01-01 12')
    const earlyOne = moment('2020-01-01 05')
    log(`earlyOne:                                     ${earlyOne}`)
    log(`laterOne:                                     ${laterOne}`)

    log(`moment.max(earlyOne, laterOne):               ${moment.max(earlyOne, laterOne)}`)
    log(`moment.max(earlyOne, laterOne) === laterOne:  ${moment.max(earlyOne, laterOne) === laterOne}`)

    log(`moment.min(earlyOne, laterOne):               ${moment.min(earlyOne, laterOne)}`)
    log(`moment.min(earlyOne, laterOne) === earlyOne:  ${moment.min(earlyOne, laterOne) === earlyOne}`)
  })
})
