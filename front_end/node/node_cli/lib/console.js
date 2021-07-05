const chalk = require('chalk')

const success = (msg) => console.log(chalk.green(`✔ ${msg}`))

const warning = (msg) => console.log(chalk.yellow(`! ${msg}`))

const error = (msg) => console.log(chalk.red(`✘ ${msg}`))

const info = (msg, base) => {
  if (!base) {
    console.log(chalk.cyan(`${msg}`))
  } else {
    console.log(chalk.blue(`[${base}] ${msg}`))
  }
}

const group = (tag, cb) => {
  console.group(tag)
  cb()
  console.groupEnd()
}

module.exports = {
  success,
  warning,
  error,
  info,
  group,
  log: console.log,
}
