import validate from './validate.js';

/**
 * 解析 uuid（转 16 位 Uint8Array）
 * @param {*} uuid
 * @returns
 */
// ? Read
function parse(uuid) {
  // 验证格式
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16);

  // 取前四位 0-8
  // Parse ########-....-....-....-............
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = (v >>> 16) & 0xff;
  arr[2] = (v >>> 8) & 0xff;
  arr[3] = v & 0xff;

  // 取中间四位 9-13
  // Parse ........-####-....-....-............
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff;

  // 14-18
  // Parse ........-....-####-....-............
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff;

  // 19-23
  // Parse ........-....-....-####-............
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff;

  // 24-36
  // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
  arr[10] = ((v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000) & 0xff;
  arr[11] = (v / 0x100000000) & 0xff;
  arr[12] = (v >>> 24) & 0xff;
  arr[13] = (v >>> 16) & 0xff;
  arr[14] = (v >>> 8) & 0xff;
  arr[15] = v & 0xff;

  return arr;
}

export default parse;
