export const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/
const stripParensRE = /^\(|\)$/g

export const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/

// 。。。

/* 解析 v-for 属性表达式 */
export function parseFor (exp: string): ?ForParseResult {
  // 正则匹配：xxx of xxx 之类的形式
  const inMatch = exp.match(forAliasRE)
  if (!inMatch) return

  // xxx in yyy: res.for = yyy
  const res = {}
  res.for = inMatch[2].trim()
  const alias = inMatch[1].trim().replace(stripParensRE, '')
  const iteratorMatch = alias.match(forIteratorRE)
  if (iteratorMatch) {
    // (xxx, zzz) in yyy
    res.alias = alias.replace(forIteratorRE, '').trim() // item
    res.iterator1 = iteratorMatch[1].trim()             // index
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim()           // array
    }
  } else {
    // xxx in yyy
    res.alias = alias
  }
  return res
}
