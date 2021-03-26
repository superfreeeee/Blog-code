// build by generate.js

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  const res = []
  if (!s || !words) return res
  const l = words[0].length
  const len = l * words.length
  const targetMap = {}
  for (const word of words) {
    targetMap[word] = targetMap[word] ? targetMap[word] + 1 : 1
  }
  for (let i = 0; i < s.length - len + 1; i++) {
    const map = {}
    let count = 0
    for (let j = i; j < i + len; j += l) {
      const word = s.substring(j, j + l)
      map[word] = map[word] ? map[word] + 1 : 1
      if (!targetMap[word] || map[word] > targetMap[word]) break
      count++
    }
    if (count === words.length) res.push(i)
  }
  return res
}

module.exports = {
  findSubstring,
}
