const path = require('path')
const chalk = require('chalk')
const { currentPath } = require('../config')

const showAction = (target, cmd) => {
  console.log(`${target}, run:`)
  console.log(`    ${chalk.cyan(cmd)}`)
  console.log()
}

const post = (targetDir) => {
  if (targetDir !== currentPath) {
    const projectName = path.basename(targetDir)
    showAction('To move inside the project', `cd ${projectName}`)
  }
  showAction('Run project', `yarn start`)
  showAction('Build & package project', `yarn build`)
}

module.exports = post
