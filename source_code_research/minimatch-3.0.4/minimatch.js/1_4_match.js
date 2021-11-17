/* Minimatch.match */
minimatch.match = function (list, pattern, options) {
  options = options || {};
  var mm = new Minimatch(pattern, options);
  list = list.filter(function (f) {
    return mm.match(f);
  });
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list;
};
