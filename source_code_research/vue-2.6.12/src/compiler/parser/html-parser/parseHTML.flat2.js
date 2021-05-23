export function parseHTML (html, options) {
  const stack = []
  const expectHTML = options.expectHTML
  const isUnaryTag = options.isUnaryTag || no
  const canBeLeftOpenTag = options.canBeLeftOpenTag || no
  let index = 0
  let last, lastTag
  while (html) {/* ... */}

  // Clean up any remaining tags
  parseEndTag()

  function advance (n) {/* ... */}

  function parseStartTag () {/* ... */}

  function handleStartTag (match) {/* ... */}

  function parseEndTag (tagName, start, end) {/* ... */}
}