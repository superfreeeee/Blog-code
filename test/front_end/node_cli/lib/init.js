const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')

const init = async () => {
  clear()
  console.log(chalk.bold('starting my-cli v1.0.0'))
  const text = await figlet('My Cli')
  console.log(text)
}

module.exports = init
