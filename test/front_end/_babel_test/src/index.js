const parser = require('@babel/parser');

console.log('parser', parser)

const code = `
function square(x) {
  return x * x
}
`;

const res = parser.parse(code);

console.log('res:');
console.log(res);
