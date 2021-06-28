const inquirer = require('inquirer')
const bar = require('../bar')

/***** get basic project info *****/
const getInfo = async () => {
  const questions = [
    {
      type: 'input',
      message: 'Project name:',
      name: 'name',
      default: 'example',
    },
    {
      type: 'input',
      name: 'author',
      default: 'superfree',
    },
    {
      type: 'list',
      name: 'type',
      choices: ['node', 'web'],
      default: 0,
    },
  ]
  return await inquirer.prompt(questions)
}

module.exports = {
  getInfo,
}
