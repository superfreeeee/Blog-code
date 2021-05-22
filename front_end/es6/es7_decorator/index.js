const group = (name, cb) => {
  console.group(name)
  cb()
  console.groupEnd()
}

const classDecs = ['basic', 'return', 'wrapper', 'proto', 'mixin']
const methodDecs = ['basic', 'readonly', 'logger', 'self']
const fieldDecs = ['basic']
const coreTests = ['test']

const createBuilder = (type) => (name) => ({
  tag: `${type} decorator ${name}`,
  file: `src/${type}/${name}`,
})

const buildClassDecModule = createBuilder('class')
const buildMethodDecModule = createBuilder('method')
const buildFieldDecModule = createBuilder('field')
const buildCoreTestModule = createBuilder('core')

const modules = [
  // ...classDecs.map(buildClassDecModule),
  // ...methodDecs.map(buildMethodDecModule),
  ...fieldDecs.map(buildFieldDecModule),
  // ...coreTests.map(buildCoreTestModule),
]

const testModule = ({ tag, file }) => {
  group(`> ${tag}`, () => {
    require(`./${file}`)
  })
}

modules.forEach((module) => {
  testModule(module)
})
