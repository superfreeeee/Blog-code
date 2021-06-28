const inquirer = require('inquirer')
const { execSync } = require('child_process')
const { getTemplate, saveFile } = require('../utils')
const path = require('path')
const prettier = require('prettier')

const templateBase = path.resolve(__dirname, '../../public/node')
const targetBase = path.resolve('./')

const catTemplatePath = (fileName) => {
  return path.join(templateBase, fileName)
}

const catTargetPath = (fileName) => {
  return path.join(targetBase, fileName)
}

const build = async ({ name, author, type, useTS }) => {
  // console.log('options:', options)
  const packageJsonPath = catTemplatePath('package.json')

  const packageJson = getTemplate(packageJsonPath, true)
  packageJson.name = name
  packageJson.author = author
  console.log(packageJson)

  const targetPackageJsonPath = catTargetPath('package.json')
  console.log(targetPackageJsonPath)
  console.log(packageJson)
  // const res = prettier.format(JSON.stringify(packageJson), {  })
  // console.log(res)
  saveFile(targetPackageJsonPath, packageJson)
  const res = execSync('yarn')
  console.log('res', res)
}

/***** build node questions *****/
const buildNodeProject = async ({ name, author, type }) => {
  const { plain, useTS } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'plain',
      message: 'Plain Project?',
    },
    {
      type: 'confirm',
      name: 'useTS',
      message: 'Using Typescript?',
    },
  ])
  if (plain) {
    return await build({ name, author, type, useTS })
  }
  console.log('not plain')
}

module.exports = {
  buildNodeProject,
}
