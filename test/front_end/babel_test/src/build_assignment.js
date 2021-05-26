/* import */
const parser = require('@babel/parser')
const generator = require('@babel/generator')
const traverser = require('@babel/traverse')
const t = require('@babel/types')

const generate = generator.default
const traverse = traverser.default

const log = console.log

/* main */

// const code = `
// console.log('hello world')
// `
const code = ``

const ast = parser.parse(code)

log('ast:', ast)

/* create assignment */
const id = t.identifier('str')
const literal = t.stringLiteral('hello world')
const declarator = t.variableDeclarator(id, literal)
const declaration = t.variableDeclaration('const', [declarator])

ast.program.body.push(declaration)

log('ast:', ast)

const output = generate(ast, {}, code)

log('output:', output)
