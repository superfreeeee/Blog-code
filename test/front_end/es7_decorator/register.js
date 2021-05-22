require('@babel/register')({
  presets: ['@babel/env'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ]
  ]
})

module.exports = require('./index.js')