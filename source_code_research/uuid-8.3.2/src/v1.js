import rng from './rng.js';
import { unsafeStringify } from './stringify.js';

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

let _nodeId; //   48 bits
let _clockseq; // 14 bits

// Previous uuid creation time
let _lastMSecs = 0;
let _lastNSecs = 0;

/**
 * version 1：根据时间戳构建 uuid
 * @param {*} options
 * @param {*} buf
 * @param {*} offset
 * @returns
 */
// ? Read
// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  // b = buf or new Array
  // i = offset or 0
  let i = (buf && offset) || 0;
  const b = buf || new Array(16);

  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  // 1. 初始化 node / clockseq
  if (node == null || clockseq == null) {
    // 随机数种子
    const seedBytes = options.random || (options.rng || rng)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      // 使用 6 个 8 位整数生成 48 位 node
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1],
        seedBytes[2],
        seedBytes[3],
        seedBytes[4],
        seedBytes[5],
      ];
    }

    // 使用两个数字混合，取后 14 位生成 clockseq
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = ((seedBytes[6] << 8) | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  // 2. ms 时间戳
  let msecs = options.msecs !== undefined ? options.msecs : Date.now();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  // 3. ns 时间戳
  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  // 计算上一次生成的时间戳差距
  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  // clockseq 递增
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = (clockseq + 1) & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  // 4.记录当前生成时间戳
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  // unix 转 UTC
  msecs += 12219292800000;

  // 5. timestamp 设置
  // `time_low` 使用 ms 低 28 位 + 4 位 nsecs 取 低 32 位
  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = (tl >>> 24) & 0xff;
  b[i++] = (tl >>> 16) & 0xff;
  b[i++] = (tl >>> 8) & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  const tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
  b[i++] = (tmh >>> 8) & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = ((tmh >>> 24) & 0xf) | 0x10; // include version
  b[i++] = (tmh >>> 16) & 0xff;

  // 6. clock_seq 设置
  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = (clockseq >>> 8) | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // 7. node 设置
  // `node` 6 个数 48 bits
  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || unsafeStringify(b);
}

export default v1;
