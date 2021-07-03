const figlet = require('figlet')
const clear = require('clear')
const chalk = require('chalk')

const init = () => {
  return new Promise((resolve, reject) => {
    clear()
    console.log(chalk.bold('starting my-cli v1.0.0'))
    figlet.text('My Cli', { font: 'Ghost' }, (err, text) => {
      if (err) reject(err)
      console.log(text)
      resolve()
    })
  })
}

module.exports = init
