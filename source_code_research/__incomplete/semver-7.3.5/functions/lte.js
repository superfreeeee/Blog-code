const compare = require('./compare');
// ? Read
// a <= b
const lte = (a, b, loose) => compare(a, b, loose) <= 0;
module.exports = lte;
