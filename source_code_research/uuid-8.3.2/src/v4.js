import native from './native.js';
import rng from './rng.js';
import { unsafeStringify } from './stringify.js';

/**
 * version 4：随机字符串
 * @param {*} options 
 * @param {*} buf 
 * @param {*} offset 
 * @returns 
 */
// ? Read
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID(); // 直接使用 crypto.randomUUID 方法
  }

  options = options || {};

  const rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  // 0 1 0 0  x x x x
  rnds[6] = (rnds[6] & 0x0f) | 0x40; // 高 4 位为 version；低 4 位为 time_hi
  // 1 0 x x  x x x x
  rnds[8] = (rnds[8] & 0x3f) | 0x80; // 高 2 位为 reserved；低 6 位为 clk-seq

  // Copy bytes to buffer, if provided
  // 写入目标 buffer，从 offset 开始
  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

export default v4;
