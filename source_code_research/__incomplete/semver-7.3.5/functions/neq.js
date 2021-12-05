const compare = require('./compare');
// ? Read
// a != b ?
const neq = (a, b, loose) => compare(a, b, loose) !== 0;
module.exports = neq;
