const path = require('path')
const { readdirSync, mkdirSync } = require('fs')
const { templatesPath, currentPath } = require('../config')

const ensureTargetDir = (projectName) => {
  let targetDir
  if (!projectName || projectName === '.') {
    if (readdirSync(currentPath).length > 0) {
      console.log('targetDir is not empty', readdirSync(currentPath))
      throw new Error('targetDir is not empty')
    }
    targetDir = currentPath
    projectName = path.basename(targetDir)
  } else {
    targetDir = path.join(currentPath, projectName)
    mkdirSync(targetDir)
  }
  return {
    projectName,
    templatesPath,
    targetDir,
  }
}

module.exports = ensureTargetDir
