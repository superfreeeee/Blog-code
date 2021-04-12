const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
const charsArr = chars.split('')
const charsMap = {}
charsArr.forEach((c, i) => (charsMap[c] = i))

const encode = (s) => {
  const mod = s.length % 3
  let c1, c2, c3, u24, b1, b2, b3, b4, res
  res = ''
  for (let i = 0; i < s.length; ) {
    c1 = s.charCodeAt(i++)
    c2 = s.charCodeAt(i++)
    c3 = s.charCodeAt(i++)
    u24 = (c1 << 16) | (c2 << 8) | c3
    b1 = charsArr[(u24 >> 18) & 0x3f]
    b2 = charsArr[(u24 >> 12) & 0x3f]
    b3 = charsArr[(u24 >> 6) & 0x3f]
    b4 = charsArr[u24 & 0x3f]
    res += `${b1}${b2}${b3}${b4}`
  }
  return mod ? res.slice(0, mod - 3) + '==='.substring(mod) : res
}

const decode = (s) => {
  let b1, b2, b3, b4, u24, res, i
  s = s.replace(/=/g, '')
  const mod = s.length % 4
  const end = s.length - mod
  res = ''
  const _fromCC = String.fromCharCode.bind(String)
  for (i = 0; i < end; ) {
    b1 = charsMap[s.charAt(i++)]
    b2 = charsMap[s.charAt(i++)]
    b3 = charsMap[s.charAt(i++)] & 0x3f
    b4 = charsMap[s.charAt(i++)] & 0x3f
    u24 = (b1 << 18) | (b2 << 12) | (b3 << 6) | b4
    c1 = _fromCC((u24 >>> 16) & 0xff)
    c2 = _fromCC((u24 >>> 8) & 0xff)
    c3 = _fromCC(u24 & 0xff)
    res += `${c1}${c2}${c3}`
  }
  if (mod === 2) {
    b1 = charsMap[s.charAt(i++)]
    b2 = charsMap[s.charAt(i++)]
    c1 = _fromCC((b1 << 2) | (b2 >> 4))
    res += c1
  } else if (mod === 3) {
    b1 = charsMap[s.charAt(i++)]
    b2 = charsMap[s.charAt(i++)]
    b3 = charsMap[s.charAt(i++)]
    u24 = (b1 << 10) | (b2 << 4) | (b3 >> 2)
    c1 = _fromCC(u24 >> 8)
    c2 = _fromCC(u24 & 0xff)
    res += `${c1}${c2}`
  }
  return res
}

const isBase64 = (s) => {
  const chars = '[A-Za-z0-9+/]'
  const pattern = new RegExp(`^(${chars}{4})*(${chars}{3}=|${chars}{2}==)?$`)
  // ^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$
  return pattern.test(s)
}

module.exports = { encode, decode, isBase64 }
