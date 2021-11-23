import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import _generate from '@babel/generator';

const traverse = _traverse.default;
const generate = _generate.default;

const code = `function greeting() {
  console.log('Hello World');
}

greeting();
`;

const ast = parse(code);

console.log('parsed AST', ast);

traverse(ast, {
  MemberExpression(p) {
    console.log('MemberExpression', p.node);
  },
});

console.log('AST after traverse', ast);

const result = generate(ast, {}, code);

console.log('Generated Result', result);
