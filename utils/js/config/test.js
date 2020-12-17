require('babel-register')({
  presets: [ 'env' ]
})

module.exports = require('../src/test.js')
