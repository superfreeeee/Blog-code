// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).

let getRandomValues;

// 一次生成 16 个 8 位数字
const rnds8 = new Uint8Array(16);

/**
 * 浏览器版本：生成随机数，一次生成 16 位 Uint8Array 对象
 * @returns 
 */
// ? Read
export default function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    // 1. 第一顺位：crypto.getRandomValues 对象
    // 2. 第二顺位：msCrypto.getRandomValues 对象
    getRandomValues =
      (typeof crypto !== 'undefined' &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)) ||
      (typeof msCrypto !== 'undefined' &&
        typeof msCrypto.getRandomValues === 'function' &&
        msCrypto.getRandomValues.bind(msCrypto));
    if (!getRandomValues) {
      throw new Error(
        'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
      );
    }
  }

  return getRandomValues(rnds8);
}
