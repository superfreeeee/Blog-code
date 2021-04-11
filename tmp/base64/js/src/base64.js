const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
const charsArr = chars.split('')

const encode = (s) => {
  const mod = s.length % 3
  let c1, c2, c3, u24, b1, b2, b3, b4, res
  res = ''
  for (let i = 0; i < s.length; ) {
    c1 = s.charCodeAt(i++)
    c2 = s.charCodeAt(i++)
    c3 = s.charCodeAt(i++)
    u24 = (c1 << 16) | (c2 << 8) | c3
    b1 = charsArr[(u24 >> 18) & 63]
    b2 = charsArr[(u24 >> 12) & 63]
    b3 = charsArr[(u24 >> 6) & 63]
    b4 = charsArr[u24 & 63]
    res += `${b1}${b2}${b3}${b4}`
  }
  return mod ? res.slice(0, mod - 3) + '==='.substring(mod) : res
}

const decode = (s) => {}

const isBase64 = (s) => {
  const chars = '[A-Za-z0-9+/]'
  const pattern = new RegExp(`^(${chars}{4})*(${chars}{3}=|${chars}{2}==)?$`)
  return pattern.test(s)
}

module.exports = { encode, decode, isBase64 }
