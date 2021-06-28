const ora = require('ora')
const chalk = require('chalk')

const spinner = ora()

const start = (msg) => {
  spinner.text(msg)
  spinner.start()
}

const stop = (msg) => {
  spinner.stopAndPersist(msg)
}

const success = (msg) => {
  spinner.stopAndPersist(chalk.green(msg))
}

const error = (msg) => {
  spinner.stopAndPersist(chalk.red(msg))
}

module.exports = {
  start,
  stop,
  success,
  error,
}
