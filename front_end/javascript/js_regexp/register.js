require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-transform-runtime'],
})

module.exports = {
  methods: require('./src/methods'),
  basic: require('./src/basic'),
  advance: require('./src/advance'),
  application: require('./src/application'),
}
