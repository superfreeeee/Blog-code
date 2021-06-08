require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-transform-runtime',
  ],
})

module.exports = require('./src/index')
