const { log } = require('../utils')

const timeout = setTimeout(() => {
  log('timeout 1')
}, 1000)

log(`timeout.hasRef(): ${timeout.hasRef()}`)
timeout.unref()
log(`timeout.hasRef(): ${timeout.hasRef()}`)

const timeout2 = setTimeout(() => {
  log(`timeout.hasRef(): ${timeout.hasRef()}`)
}, 2000)
log(`timeout2.hasRef(): ${timeout2.hasRef()}`)
timeout2.unref()
log(`timeout2.hasRef(): ${timeout2.hasRef()}`)
