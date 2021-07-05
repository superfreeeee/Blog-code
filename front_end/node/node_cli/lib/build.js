const {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
  statSync,
} = require('fs')
const path = require('path')
const prettier = require('prettier')
const yarnHelper = require('./yarn')

/***** copy files to target dir *****/
// copy package.json
const copyPackageJson = (templateBase, targetDir, { name, author }) => {
  const packageJson = JSON.parse(
    readFileSync(path.join(templateBase, 'package.json'))
  )
  packageJson.name = name
  packageJson.author = author

  writeFileSync(
    path.join(targetDir, 'package.json'),
    prettier.format(JSON.stringify(packageJson), { parser: 'json-stringify' })
  )
}

// copy rest
const copyRestFiles = (baseDir, targetDir, excludes = ['package.json']) => {
  // get files
  const files = readdirSync(baseDir).filter(
    (fileName) => !excludes.includes(fileName)
  )
  files.forEach((fileName) => {
    const sourceFilePath = path.join(baseDir, fileName)
    const targetFilePath = path.join(targetDir, fileName)

    const stats = statSync(sourceFilePath)
    if (stats.isDirectory()) {
      // dir
      // ensure dir exists
      if (!existsSync(targetFilePath)) {
        mkdirSync(targetFilePath)
      }

      copyRestFiles(sourceFilePath, targetFilePath, excludes)
    } else {
      // plain files
      const fileContent = readFileSync(sourceFilePath)
      writeFileSync(targetFilePath, fileContent)
    }
  })
}

const unreadyTemplate = ['web']

const build = async (options, { templatesPath, targetDir }) => {
  console.log('Your options:', options)
  if (unreadyTemplate.includes(options.template)) {
    console.log(`template '${options.template}' is not ready yet`)
    return
  }
  const templateBase = path.join(templatesPath, options.template)

  copyPackageJson(templateBase, targetDir, options)

  copyRestFiles(templateBase, targetDir)

  await yarnHelper.install(targetDir)
}

module.exports = build
