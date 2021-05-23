export function parseHTML (html, options) {
  const stack = []
  const expectHTML = options.expectHTML
  const isUnaryTag = options.isUnaryTag || no
  const canBeLeftOpenTag = options.canBeLeftOpenTag || no
  let index = 0
  let last, lastTag
  while (html) {
    last = html
    
    if (!lastTag || !isPlainTextElement(lastTag)) {
      /* 非文本节点(亦非 script/style 节点)内部 */
    } else {
      /* 文本节点 */
    }

    if (html === last) {
      /* ... */
      options.chars && options.chars(html)
      // mal-formatted tag at end of template warning ...
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