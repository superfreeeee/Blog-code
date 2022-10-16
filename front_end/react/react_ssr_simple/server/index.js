const path = require('path');

// ignore `.scss` imports
require('ignore-styles');

// transpile imports on the fly
require('@babel/register')({
  configFile: path.resolve(__dirname, '../.babelrc'),
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

// import express server
require('./express.js');
