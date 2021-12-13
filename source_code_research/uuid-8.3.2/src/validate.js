import REGEX from './regex.js';

/**
 * 验证 uuid 字符串
 * @param {*} uuid 
 * @returns 
 */
// ? Read
function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

export default validate;
