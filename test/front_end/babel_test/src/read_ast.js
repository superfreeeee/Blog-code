/* import */
const parser = require('@babel/parser')
const generator = require('@babel/generator')
const traverser = require('@babel/traverse')
const t = require('@babel/types')

const { getCodeSync } = require('./utils')

const generate = generator.default
const traverse = traverser.default

const log = console.log

/* main */

// const code = `
// console.log('hello world')
// `
const code = getCodeSync('./code/test1.js')

log('code', code)

const ast = parser.parse(code, { sourceType: 'module' })

log('ast:', ast)

log('program body:', ast.program.body)
log('object properties:', ast.program.body[0].declaration.properties)

const output = generate(ast, {}, code)

log('output:', output)
