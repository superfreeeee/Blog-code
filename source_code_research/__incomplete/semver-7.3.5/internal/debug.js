/**
 * 运行过程输出(NODE_DEBUG=semver)
 */
// ? Read
const debug =
  typeof process === 'object' &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
    ? (...args) => console.error('SEMVER', ...args)
    : () => {};

module.exports = debug;
