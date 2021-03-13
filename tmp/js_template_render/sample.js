// const template = `<h2>
//   <a href="{{href}}">
//    {{  title   }}
//   </a>
//   <img src="{{   imgSrc   }}" alt="{{title}}"/>
//   <div>{{ abc  }}</div>
// </h2>`
const template = `<h2>
  <a href="{{href}}">
   {{  title   }}
  </a>
  <img src="{{   imgSrc   }}" alt="{{title}}"/>
  <div>
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
  <div>{{ abc  }}</div>
</h2>`
// const template = `<a href="{{href}}">
//    {{  title   }}
//   </a>
//   <img src="{{   imgSrc   }}" alt="{{title}}"/>
//   <div>{{ abc  }}</div>
// `

console.log('----- template -----')
console.log(template)

const data = {
  title: 'This is a title',
  href: 'http://www.example.com',
  imgSrc: 'http:/www.example.com/sample.png'
}
console.log('----- data -----')
console.log(data)

function render (template, data) {
  let t = template
  for (const prop in data) {
    const reg = new RegExp(`{{ *${prop} *}}`, 'ig')
    t = t.replace(reg, data[prop])
  }
  const whiteReg = new RegExp(`{{ *(\\w+) *}}`, 'ig')
  t = t.replace(whiteReg, '{{$1}}')
  return t
}

console.log('----- after replacement -----')
const res = render(template, data)
console.log(res)

console.log('----- virtual elements -----')
function compile (template) {
  template = template ? template.replace(/\s+/g, ' ') : ''
  if (!template) return []
  // console.log(`template = ${template}`)
  const tagReg = new RegExp(`<(\\w+)(.*?)(?:/ *>|>(.*?)</\\1>)`, 'gm')
  // const tagReg = new RegExp(`<h2>.*</h2>`, 'gm')
  // console.log(tagReg)
  // console.log(template.match(tagReg))
  const elements = []
  template.replace(tagReg, function (whole ,tag, attrs, content) {
    // console.log('----- replace -----')
    // console.log(`whole = '${whole}'`)
    // console.log(`tag = '${tag}'`)
    // console.log(`attrs = '${attrs}'`)
    // console.log(`content = '${content}'`)
    elements.push({
      origin: whole.trim(),
      tag,
      attrs,
      children: compile(content)
      // children: compile(content)
    })
  })
  return elements
}
const elements = compile(res)
console.log(elements[0])
console.log(elements[0].children[2])
console.log(elements[0].children[2].children[0])
// for (let child of elements[0].children) {
//   console.log(child)
// }
// const children = compile(elements[0].content)
// console.log(children)