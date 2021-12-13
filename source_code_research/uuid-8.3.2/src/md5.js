import crypto from 'crypto';

/**
 * md5 散列算法
 *   依赖 crypto.createHash 方法
 * @param {*} bytes 
 * @returns 
 */
// ? Read
function md5(bytes) {
  // 数组 / 字符串转换成 Buffer
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  // 对 Buffer 加密并返回
  return crypto.createHash('md5').update(bytes).digest();
}

export default md5;
