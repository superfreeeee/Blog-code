import crypto from 'crypto';

// 一次生成 256 个 Byte
const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
let poolPtr = rnds8Pool.length;

/**
 * 随机数生成器，每次返回 16 个 byte (Uint8Array 类型)
 * @returns 
 */
// ? Read
export default function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    // poolPtr 指向当前偏移量，取完则重新生成
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  // 每次取 16 位
  return rnds8Pool.slice(poolPtr, (poolPtr += 16));
}
