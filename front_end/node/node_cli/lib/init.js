const figlet = require('figlet')
const clear = require('clear')
const chalk = require('chalk')

const init = async () => {
  clear()
  console.log(chalk.bold('starting my-cli v1.0.0'))
  const text = figlet.textSync('My Cli', { font: 'Ghost' })
  console.log(text)
}

module.exports = init
