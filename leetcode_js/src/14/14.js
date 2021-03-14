// build by generate.js

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs || strs.length === 0) return ''
  let prefix = strs[0]
  for(let i=0; i<prefix.length; i++) {
    for(const str of strs) {
      if(str.charAt(i) !== prefix.charAt(i)) {
        return prefix.substring(0, i)
      }
    }
  }
  return prefix
}

module.exports = {
  longestCommonPrefix,
}
