import validate from './validate.js';

/**
 * 抽取 uuid 的编码版本
 * @param {*} uuid
 * @returns
 */
// ? Read
function version(uuid) {
  // 验证字符串是否合法
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  // 取 uuid 第 15 个字符（4 位），按 16 进制编码转换成数字
  // xxxxxxxx-xxxx-(v)
  return parseInt(uuid.substr(14, 1), 16);
}

export default version;
