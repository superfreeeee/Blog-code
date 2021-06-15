import { log, group } from './utils'

log('>>> application.js')

group('application: mail address', () => {
  const mail = 'superfreeeee@gmail.com'
  const mailPattern = /[_\w]+@(?:\w+\.)[a-z]+/
  log('mail                   :', mail)
  log('mailPattern            :', mailPattern)
  log(`mail.match(mailPattern):`, mail.match(mailPattern))
})

group('application: url parse', () => {
  const url1 =
    'http://localhost:8080/user/login?name=superfree&mail=superfreeeee@gmail.com'
  const urlPattern = /(http|https):\/\/(\w+):(\d+)((?:\/\w+)*)(\?.*)/
  log('url1                  :', url1)
  log('urlPattern            :', urlPattern)
  log(`url1.match(urlPattern):`, url1.match(urlPattern))

  const [, protocal, host, port, path, queryStr] = url1.match(urlPattern)
  group('match groups', () => {
    log(`protocal: ${protocal}`)
    log(`host    : ${host}`)
    log(`port    : ${port}`)
    log(`path    : ${path}`)
    log(`queryStr: ${queryStr}`)
  })

  const queryParamsPattern = /([^?&#+]+=[^?&#+]+)/g
  group('match query parameters', () => {
    log('queryStr                          :', queryStr)
    log('queryParamsPattern                :', queryParamsPattern)
    log(
      `queryStr.match(queryParamsPattern):`,
      queryStr.match(queryParamsPattern)
    )
  })

  function parseUrl(url) {
    const urlPattern = /(http|https):\/\/(\w+):(\d+)((?:\/\w+)*)(\?.*)/
    const queryParamsPattern = /([^?&#+]+=[^?&#+]+)/g
    const [, protocal, host, port, path, queryStr] = url.match(urlPattern)
    const props = {}
    queryStr.match(queryParamsPattern).forEach((pair) => {
      const [key, value] = pair.split('=')
      props[key] = value
    })
    return {
      protocal,
      host,
      port,
      path,
      props,
    }
  }

  log('parseUrl(url1):', parseUrl(url1))
})

group('application: html', () => {
  let html = `<div id="root" class="container" style="width: 100px; height: 200px">
  <h1>这是一个标题</h1>
  <br/>
  <p>这是一个段落</p>
</div>`

  function parseHTML(html) {
    const nodes = []
    const stack = []

    while (html) {
      const lastHtml = html

      // parse start tag
      if (isStartTag(html)) {
        // log('>>> parse start tag')
        const [matcher, restHtml] = parseStartTag(html)
        if (!matcher.closed) {
          stack.push(matcher)
        } else {
          closeTag(matcher)
        }
        // group('start tag', () => {
        //   log('matcher:', matcher)
        //   log('rest:', restHtml)
        // })
        html = restHtml
        continue
      }

      // parse end tag
      if (isEndTag(html)) {
        // log('>>> parse end tag')
        const [matcher, restHtml] = parseEndTag(html)
        let lastTag
        while ((lastTag = getLastTag())) {
          if (matcher.tagName !== lastTag.tagName) {
            log(
              `unmatched tag: ${lastTag.tagName}, expected: ${matcher.tagName}`
            )
            stack.pop()
            closeTag(lastTag)
          } else {
            break
          }
        }
        stack.pop()
        closeTag(lastTag)
        // group('end tag', () => {
        //   log('lastTag:', lastTag)
        //   log('matcher:', matcher)
        //   log('rest:', restHtml)
        // })
        html = restHtml
        continue
      }

      // parse text
      // log('>>> parse text')
      const [text, restHtml] = parseText(html)
      if (text) {
        getLastTag().children.push(text)
        html = restHtml
        // group('text node', () => {
        //   log(`nodes:`, nodes)
        //   log(`stack:`, stack)
        //   log('rest:', html)
        // })
      }

      if (html === lastHtml) break
    }

    function getLastTag() {
      const lastTag = stack.length && stack[stack.length - 1]
      if (!lastTag) {
        log('found root text')
        const node = { tagName: 'text', attrs: {}, children: [], closed: true }
        nodes.push(node)
        return node
      }
      return lastTag
    }

    function isStartTag(html) {
      return /^<[^\/]/.test(html)
    }

    function parseStartTag(html) {
      let matcher

      // parse tag name: <tagName
      const startTagPattern = /^<(\w+)/
      matcher = html.match(startTagPattern)
      const [parsed, tagName] = matcher
      html = html.substring(matcher.index + parsed.length).trim()

      // parse attrs: xxx="xxx"
      const attrPattern = /^(\w+)="(.*?)"/
      const attrs = {}
      while ((matcher = attrPattern.exec(html))) {
        const [parsed, key, value] = matcher
        attrs[key] = value
        html = html.substring(matcher.index + parsed.length).trim()
      }

      // parse end of start tag: >
      let index,
        closed = false
      index = html.search(/^\/>/)
      if (index >= 0) {
        closed = true
        html = html.substring(index + 2).trim()
      } else {
        index = html.search(/>/)
        html = html.substring(index + 1).trim()
      }
      return [{ tagName, attrs, children: [], closed }, html]
    }

    function isEndTag(html) {
      return /^<\//.test(html)
    }

    function parseEndTag(html) {
      const endTagPattern = /^<\/(\w+)>/
      const matcher = html.match(endTagPattern)
      const [parsed, tagName] = matcher
      return [{ tagName }, html.substring(matcher.index + parsed.length).trim()]
    }

    function parseText(html) {
      let index = html.search('<')
      if (index < 0) index = html.length
      const text = html.substring(0, index)
      return [text, html.substring(index)]
    }

    function closeTag(matcher) {
      if (stack.length) {
        stack[stack.length - 1].children.push(matcher)
      } else {
        nodes.push(matcher)
      }
    }

    while (stack.length) {
      const node = stack.shift()
      log(`unclosed tag: ${node.tagName}`)
      nodes.push(node)
    }

    return nodes
  }

  log(`html:
${html}`)

  const nodes = parseHTML(html)
  log('nodes:')
  nodes.forEach((node) => log(node))
})
