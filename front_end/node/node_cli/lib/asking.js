const inquirer = require('inquirer')

const ask = async (questions) => {
  return await inquirer.prompt(questions)
}

const genQuestions = (projectName) => ({
  info: [
    {
      type: 'input',
      message: 'Project name:',
      name: 'name',
      default: projectName,
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
    },
  ],
  node: [
    {
      type: 'confirm',
      name: 'useBabel',
      message: 'Using Babel?',
      default: false,
    },
    {
      when: (answers) => {
        if (!answers.useBabel) {
          answers.useTS = false
          return false
        }
        return true
      },
      type: 'confirm',
      name: 'useTS',
      message: 'Using Typescript?',
      default: false,
    },
  ],
  web: [
    {
      type: 'confirm',
      name: 'useWebpack',
      message: 'Using Webpack?',
    },
  ],
})

const getTemplate = (type, options) => {
  if (type === 'node') {
    if (!options.useBabel) return 'node'
    if (!options.useTS) return 'node_babel'
    return 'node_babel_ts'
  } else if (type === 'web') {
    return 'web'
  } else {
    throw new Error('unkown type')
  }
}

const asking = async (projectName) => {
  const questions = genQuestions(projectName)
  try {
    const info = await ask(questions.info)
    // console.log('info', info)
    const options = await ask(questions[info.type])
    // console.log('options', options)
    const template = getTemplate(info.type, options)
    return {
      ...info,
      ...options,
      template,
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

module.exports = asking
