module.exports = function (source) {
  return source.replace(/[ \n\t]/g, '');
};
