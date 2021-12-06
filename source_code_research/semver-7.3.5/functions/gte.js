const compare = require('./compare');
// ? Read
// a >= b
const gte = (a, b, loose) => compare(a, b, loose) >= 0;
module.exports = gte;
