const dayjs = require('dayjs')
const { log, group } = require('../utils/group')
const minMax = require('dayjs/plugin/minMax')

dayjs.extend(minMax)

group('day.js operate', () => {
  const origin = dayjs('2019-11-01 23:59:59.699')

  let time = origin.clone()
  group('add', () => {
    log(`current time:            ${time}`)
    log(`time.add(365, 'days'):   ${time.add(365, 'days')}`)
    log(`time.add(1, 'years'):    ${time.add(1, 'years')}`)
    log(`time.add(8, 'd'):        ${time.add(8, 'd')}`)
    log(`time.add({ days: 7 }):   ${time.add({ days: 7 })}`)
  })

  time = origin.clone().year(2020)
  group('subtract', () => {
    log(`current time:                ${time}`)
    log(`time.subtract(365, 'days'):  ${time.subtract(365, 'days')}`)
    log(`time.subtract(1, 'years'):   ${time.subtract(1, 'years')}`)
  })

  group('startOf/endOf', () => {
    time = dayjs('2019-01-01 01:30:30.333')
    log(`time:                    ${time}`)
    log(`time.startOf('minute'):  ${time.clone().startOf('minute')}`)
    log(`time.startOf('hour'):    ${time.clone().startOf('hour')}`)

    log(`time:                  ${time}`)
    log(`time.endOf('minute'):  ${time.clone().endOf('minute')}`)
    log(`time.endOf('hour'):    ${time.clone().endOf('hour')}`)
  })

  group('max/min', () => {
    const laterOne = dayjs('2020-01-01 12')
    const earlyOne = dayjs('2020-01-01 05')
    log(`earlyOne:                                    ${earlyOne}`)
    log(`laterOne:                                    ${laterOne}`)

    log(`dayjs.max(earlyOne, laterOne):               ${dayjs.max(earlyOne, laterOne)}`)
    log(`dayjs.max(earlyOne, laterOne) === laterOne:  ${dayjs.max(earlyOne, laterOne) === laterOne}`)

    log(`dayjs.min(earlyOne, laterOne):               ${dayjs.min(earlyOne, laterOne)}`)
    log(`dayjs.min(earlyOne, laterOne) === earlyOne:  ${dayjs.min(earlyOne, laterOne) === earlyOne}`)
  })

})