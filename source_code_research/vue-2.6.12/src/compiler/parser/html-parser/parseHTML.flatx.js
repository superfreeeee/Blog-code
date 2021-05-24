import { makeMap, no } from 'shared/util'
import { isNonPhrasingTag } from 'web/compiler/util'
import { unicodeRegExp } from 'core/util/lang'

// 正则表达式(标签、属性)
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
// 注释标签
const comment = /^<!\--/
const conditionalComment = /^<!\[/

// 特殊标签
export const isPlainTextElement = makeMap('script,style,textarea', true)
const reCache = {}

// 特殊字符转义表
const decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
}
const encodedAttr = /&(?:lt|gt|quot|amp|#39);/g
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g

const isIgnoreNewlineTag = makeMap('pre,textarea', true)
const shouldIgnoreFirstNewline = (tag, html) => tag && isIgnoreNewlineTag(tag) && html[0] === '\n'

function decodeAttr (value, shouldDecodeNewlines) {/* ... */}

export function parseHTML (html, options) {
  const stack = []
  const expectHTML = options.expectHTML
  const isUnaryTag = options.isUnaryTag || no
  const canBeLeftOpenTag = options.canBeLeftOpenTag || no
  let index = 0
  let last, lastTag

  // 主流程
  while (html) {
    last = html
    if (!lastTag || !isPlainTextElement(lastTag)) {
      /* 在普通节点内 */

      // 寻找下一个 < 的位置(即下一个标签的起始位置)
      let textEnd = html.indexOf('<')
      if (textEnd === 0) {
        /* case 1: 下一个标签位于开头 */

        // 1.1 检查是否为注释：<!--
        if (comment.test(html)) {
          const commentEnd = html.indexOf('-->')

          // 寻找注释结尾
          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              // 可选是否保留注释
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
            }
            // 前进到 --> 之后
            advance(commentEnd + 3)
            continue
          }
        }

        // 1.2 检查是否为条件注释：<![
        if (conditionalComment.test(html)) {
          const conditionalEnd = html.indexOf(']>')

          if (conditionalEnd >= 0) {
            // 前进到 ]> 之后
            advance(conditionalEnd + 2)
            continue
          }
        }

        // 1.3 Doctype<!DOCTYPE >
        const doctypeMatch = html.match(doctype)
        if (doctypeMatch) {
          advance(doctypeMatch[0].length)
          continue
        }

        // 1.4 结束标签：</xxx
        const endTagMatch = html.match(endTag)
        if (endTagMatch) {
          const curIndex = index
          advance(endTagMatch[0].length)  // 前进到 </xxx> 之后
          parseEndTag(endTagMatch[1], curIndex, index)
          continue
        }

        // 1.5 开始标签：<xxx
        const startTagMatch = parseStartTag()
        if (startTagMatch) {
          handleStartTag(startTagMatch)
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1)
          }
          continue
        }
      }

      let text, rest, next
      if (textEnd >= 0) {
        /* case 2: 下一个标签前存在文本 */
        rest = html.slice(textEnd)
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // 允许标签前的 <
          next = rest.indexOf('<', 1)
          if (next < 0) break
          textEnd += next
          rest = html.slice(textEnd)
        }
        text = html.substring(0, textEnd)
      }

      /* case 3: 整段 html 都是文本 */
      if (textEnd < 0) {
        text = html
      }

      if (text) {
        // 前进到文本后
        advance(text.length)
      }

      if (options.chars && text) {
        // 解析文本并创建文本节点
        options.chars(text, index - text.length, index)
      }
    } else {
      /* style / script 节点内 */
      let endTagLength = 0
      const stackedTag = lastTag.toLowerCase()
      const reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'))

      // 替换剩余文本
      const rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1')
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1)
        }
        if (options.chars) {
          // 匹配 style / script 节点内文本
          options.chars(text)
        }
        return ''
      })
      index += html.length - rest.length
      html = rest
      parseEndTag(stackedTag, index - endTagLength, index)
    }

    // 前后文本不变
    if (html === last) {
      // 直接匹配文本内容后返回
      options.chars && options.chars(html)

      // mal-formatted tag warning ...
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag()

  function advance (n) {/* ... */}

  function parseStartTag () {/* ... */}

  function handleStartTag (match) {/* ... */}

  function parseEndTag (tagName, start, end) {/* ... */}
}
