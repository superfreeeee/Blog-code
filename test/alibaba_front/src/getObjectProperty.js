// build by generate.js

// 题目
// 给定一个对象和一个路径，得到路径对应的值

// 输入输出样例
// 样例一
// 输入：get({a: 1}, 'a')
// 输出：1

// 样例二
// 输入：get({a: [1, {b: 2}]}, 'a[1].b')
// 输出：2

function get(obj, path) {
  const p_token = /[a-z0-9]*/
  const p_attr = /(?:\[)[0-9a-z]*(?:\])|(?:\.)[0-9a-z]*/
  let attr = path.match(p_token)
  console.log(attr)
  if (!(attr in obj)) return null
  obj = obj[attr]
  path = path.substring(0, attr.length)
  while ((attr = path.match(p_attr))) {
    console.log(attr)
    if (!(attr in obj)) return obj
    obj = obj[attr]
    path = path.substring(0, attr.length)
  }
  return obj
}

module.exports = {
  get,
}
