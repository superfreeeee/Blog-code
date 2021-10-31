function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {},
  once: function (name, callback, ctx) {},
  emit: function (name) {},
  off: function (name, callback) {}
};

module.exports = E;
module.exports.TinyEmitter = E;
