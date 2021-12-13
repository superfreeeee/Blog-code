import crypto from 'crypto';

/**
 * sha1 加密算法：crypto 包支持
 * @param {*} bytes
 * @returns
 */
// ? Read
function sha1(bytes) {
  // 格式对齐 Buffer
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  // 返回 Buffer
  return crypto.createHash('sha1').update(bytes).digest();
}

export default sha1;
