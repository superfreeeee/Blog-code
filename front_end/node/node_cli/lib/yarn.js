const { exec, execSync } = require('child_process')

const spinner = require('./spinner')
const console = require('./console')

const install = (targetDir) => {
  return new Promise((resolve, reject) => {
    spinner.start('Start yarn install ...')

    exec('yarn', { cwd: targetDir }, (err, stdout, stderr) => {
      if (err) reject(err)
      spinner.success('yarn install success')
      console.log(stdout)
      resolve()
    })
  })
}

module.exports = {
  install,
}
