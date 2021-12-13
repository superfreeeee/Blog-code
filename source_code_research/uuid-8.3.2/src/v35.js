import { unsafeStringify } from './stringify.js';
import parse from './parse.js';

/**
 * 字符串 转 charCode 数组
 * @param {*} str
 * @returns
 */
// ? Read
function stringToBytes(str) {
  // 避免 UTF-8 escape 非完整字符出现
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  // 转数组
  for (let i = 0; i < str.length; ++i) {
    // 使用 charCodeAt
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

export const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
export const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';

/**
 * version 3、version 5 通用模版
 * @param {*} name
 * @param {*} version
 * @param {*} hashfunc
 * @returns
 */
// ? Read
export default function v35(name, version, hashfunc) {
  /**
   * 生成函数
   *   版本号 version
   *   绑定哈希算法 hashfunc
   * @param {*} value
   * @param {*} namespace
   * @param {*} buf
   * @param {*} offset
   * @returns
   */
  // ? Read
  function generateUUID(value, namespace, buf, offset) {
    // 字符串转数组
    if (typeof value === 'string') {
      // 数组
      value = stringToBytes(value);
    }

    // 命名空间解析
    if (typeof namespace === 'string') {
      // 16 位 Uint8Array
      namespace = parse(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError(
        'Namespace must be array-like (16 iterable integer values, 0-255)'
      );
    }

    // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`
    // 至少 16 位（16 + 参考字符串长度）
    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    // bytes = hash([...namespace, ...value])
    bytes = hashfunc(bytes);

    // 设置版本号 & variant 标识位
    bytes[6] = (bytes[6] & 0x0f) | version;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    // 写入目标 Buffer
    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    // 返回格式化字符串
    return unsafeStringify(bytes);
  }

  // Function#name is not settable on some platforms (#270)
  try {
    // Function.name 可能存在报错
    generateUUID.name = name;
    // eslint-disable-next-line no-empty
  } catch (err) {}

  // For CommonJS default export support
  // CommonJS 的 DNS、URL 导出
  generateUUID.DNS = DNS;
  generateUUID.URL = URL;

  return generateUUID;
}
