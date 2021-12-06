// import ansiEscapes from './index.js';

var util = require('util');

function dsr(callback) {
  process.stdin.setRawMode(true);
  process.stdin.once('data', function (data) {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    callback(data.toString());
  });
  process.stdout.write('\x1b[6n');
}

dsr(function (data) {
  // const re = new RegExp('\u{1B}\\[\\d+;\\d+R');
  const re = /\\x1B\[(\d+);(\d+)R/;
  data = util.inspect(data);
  console.log(`data = ${data}`);
  console.log(`re = ${re}`);

  const [, row, col] = data.match(re);
  console.log(`row = ${row}, col = ${col}`);
});
