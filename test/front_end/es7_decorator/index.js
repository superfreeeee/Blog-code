console.log('start testing')

const group = (name, cb) => {
  console.group(name)
  cb()
  console.groupEnd()
}

const testModule = ({ tag, file }) => {
  group(`> ${tag}`, () => {
    require(`./${file}`)
  })
}

const modules = [
  { tag: 'class decorator basic', file: 'src/class/basic' },
  { tag: 'class decorator return', file: 'src/class/return' }
]

modules.forEach((module) => {
  testModule(module)
})
