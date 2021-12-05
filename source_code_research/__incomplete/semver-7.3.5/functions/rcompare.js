const compare = require('./compare');
// ? compare 反向版本
const rcompare = (a, b, loose) => compare(b, a, loose);
module.exports = rcompare;
