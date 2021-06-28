#!/usr/bin/env node

const init = require('./lib/init')
const { getInfo } = require('./lib/helpers/project')
const { buildNodeProject } = require('./lib/helpers/builderNode')
const { buildWebProject } = require('./lib/helpers/builderWeb')

init()
  .then(() => {
    return getInfo()
  })
  .then((info) => {
    return {
      node: buildNodeProject,
      web: buildWebProject,
    }[info.type](info)
  })
  .then((res) => {
    // console.log(res)
  })
