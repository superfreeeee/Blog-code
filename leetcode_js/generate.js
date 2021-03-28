const fs = require('fs')

const { name, test } = require('minimist')(process.argv.slice(2))
// console.log(`name = ${name}`)
// console.log(`test = ${test}`)

if (!name) {
  console.error('name is required')
  console.log()
  console.log('\ttry add --name=xxx')
  console.log()
}
const count = test ? test : 1

const sourceTemplate = `// build by generate.js



module.exports = {  }
`

let testTemplate = `const { expect, test } = require('@jest/globals')
const {  } = require('./${name}')
`

for (let i = 1; i <= count; i++) {
  testTemplate += `
test('test ${i}', () => {
  expect().toBe()
})
`
}

fs.stat(`./src/${name}`, (exists) => {
  const buildFiles = () => {
    fs.writeFile(`./src/${name}/${name}.js`, sourceTemplate, (err) => {
      if (err) {
        console.log(`build ${name}.js fail`)
      } else {
        console.log(`build ${name}.js success`)
      }
    })
    fs.writeFile(`./src/${name}/${name}.test.js`, testTemplate, (err) => {
      if (err) {
        console.log(`build ${name}.test.js fail`)
      } else {
        console.log(`build ${name}.test.js success`)
      }
    })
  }

  if (exists) {
    fs.mkdir(`./src/${name}`, (err) => {
      if (err) {
        console.log(`build ./src/${name} fail`)
      } else {
        console.log(`build ./src/${name} success`)
        buildFiles()
      }
    })
  } else {
    console.log(`./src/${name} exists`)
    buildFiles()
  }
})
