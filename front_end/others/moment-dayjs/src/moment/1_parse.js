const moment = require('moment')
const { log, group } = require('../utils/group')

group('moment.js parse', () => {
  group('moment', () => {
    log(`moment():                            ${moment().format()}`)
    log(`moment('2021-11-01'):                ${moment('2021-11-01').format()}`)
    log(`moment('2021-11-01 23:59:59'):       ${moment('2021-11-01 23:59:59').format()}`)
    log(`moment('20211101T235959'):           ${moment('20211101T235959').format()}`)
    log(`moment('01-11-2021', 'DD-MM-YYYY'):  ${moment('01-11-2021', 'DD-MM-YYYY').format()}`)
    log(`moment([2021, 10, 1, 23, 59, 59]):   ${moment([2021, 10, 1, 23, 59, 59]).format()}`)
  })

  group('clone', () => {
    const m1 = moment()
    const m2 = moment(m1)
    const m3 = m2.clone()
    log(`m1:  ${m1.toString()}`)
    log(`m2:  ${m2.toString()}`)
    log(`m3:  ${m3.toString()}`)
    log(`m1 === m2:                        ${m1 === m2}`)
    log(`m1 === m3:                        ${m1 === m3}`)
    log(`m2 === m3:                        ${m2 === m3}`)
    log(`m1.toString() === m2.toString():  ${m1.toString() === m2.toString()}`)
    log(`m1.toString() === m3.toString():  ${m1.toString() === m3.toString()}`)
    log(`m2.toString() === m3.toString():  ${m2.toString() === m3.toString()}`)
  })
})
