const compare = require('./compare');
// ? Read
// a < b
const lt = (a, b, loose) => compare(a, b, loose) < 0;
module.exports = lt;
