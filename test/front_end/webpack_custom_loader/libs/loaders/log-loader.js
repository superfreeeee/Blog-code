const { writeFileSync } = require('fs');
const path = require('path');

let count = 0;

module.exports = function (source) {
  console.log('this.keys:', Reflect.ownKeys(this));
  
  count++;
  writeFileSync(path.resolve(__dirname, `../../tmp/${count}.js`), source);
  return source;
};
