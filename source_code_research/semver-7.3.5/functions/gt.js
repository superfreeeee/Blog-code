const compare = require('./compare');
// ? Read
// a > b ?
const gt = (a, b, loose) => compare(a, b, loose) > 0;
module.exports = gt;
