const ora = require('ora')
const chalk = require('chalk')

const spinner = ora()

const start = (msg) => {
  spinner.text = chalk.cyan(msg)
  spinner.start()
}

const stop = (msg) => {
  spinner.stopAndPersist(msg)
}

const success = (msg) => {
  spinner.succeed(chalk.green(msg))
}

const error = (msg) => {
  stop(chalk.red(msg))
}

module.exports = {
  start,
  stop,
  success,
  error,
}
