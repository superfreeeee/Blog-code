var wrappy = require('wrappy');
module.exports = wrappy(once);
module.exports.strict = wrappy(onceStrict);

once.proto = once(function () {});

function once(fn) {}

function onceStrict(fn) {}
