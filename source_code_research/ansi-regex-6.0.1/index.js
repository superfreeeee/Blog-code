/**
 * 逃脱序列 正则表达式
 * @param {*} param0
 * @returns
 */
export default function ansiRegex({ onlyFirst = false } = {}) {
  const pattern = [
    // 0x1B = esc, 0x9B = esc [
    //                特殊符号                  任意控制字符                  控制字符2                       特殊字符
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
  ].join('|');

  return new RegExp(pattern, onlyFirst ? undefined : 'g');
}
