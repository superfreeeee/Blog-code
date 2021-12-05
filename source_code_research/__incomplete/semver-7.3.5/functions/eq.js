const compare = require('./compare');
// ? Read
// a = b ?
const eq = (a, b, loose) => compare(a, b, loose) === 0;
module.exports = eq;
