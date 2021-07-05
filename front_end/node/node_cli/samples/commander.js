#!/usr/bin/env node

const { program } = require('commander')

program
  .version('v1.0.0', '-v, --version')
  .usage('<command> <param1> [param2]')
  .command('hello <param1> [param2]')
  .action((param1, param2) => {
    console.log('param1', param1)
    console.log('param2', param2)
  })

program.parse()
