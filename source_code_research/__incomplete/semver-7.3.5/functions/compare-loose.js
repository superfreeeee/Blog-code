const compare = require('./compare');
// ? compare loose 版本
const compareLoose = (a, b) => compare(a, b, true);
module.exports = compareLoose;
