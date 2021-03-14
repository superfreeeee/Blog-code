// build by generate.js

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits || digits.length === 0) return []
  const mapper = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  }
  let res = mapper[digits[0]].split('')
  for (let i = 1; i < digits.length; i++) {
    let nextRes = []
    for (const pos of res) {
      mapper[digits[i]].split('').forEach((c) => {
        nextRes.push(pos + c)
      })
    }
    res = nextRes
  }
  return res
}

module.exports = {
  letterCombinations,
}
