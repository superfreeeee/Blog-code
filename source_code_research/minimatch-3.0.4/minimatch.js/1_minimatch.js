/* default 入口 */
function minimatch(p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required');
  }

  if (!options) options = {};

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false;
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === '';

  return new Minimatch(pattern, options).match(p);
}
