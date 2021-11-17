// replace stuff like \* with *
/* 取消转义 */
function globUnescape(s) {
  return s.replace(/\\(.)/g, '$1');
}
