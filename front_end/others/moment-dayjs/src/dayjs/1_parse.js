const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const { log, group } = require('../utils/group')

group('day.js parse', () => {
  dayjs.extend(customParseFormat)
  group('dayjs', () => {
    log(`dayjs():                            ${dayjs().format()}`)
    log(`dayjs('2021-11-01'):                ${dayjs('2021-11-01').format()}`)
    log(`dayjs('2021-11-01 23:59:59'):       ${dayjs('2021-11-01 23:59:59').format()}`)
    log(`dayjs('20211101T235959'):           ${dayjs('20211101T235959').format()}`)
    log(`dayjs('01-11-2021', 'DD-MM-YYYY'):  ${dayjs('01-11-2021', 'DD-MM-YYYY').format()}`)
  })

  group('clone', () => {
    const m1 = dayjs()
    const m2 = dayjs(m1)
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
