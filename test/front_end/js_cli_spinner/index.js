// const singleLog = require('single-line-log').stdout;
// singleLog('Hello World\n');
// singleLog('Hi superfree\n');
// console.log('console.log');
// singleLog('singleLog\n');

const CURSOR_DIRECTION = {
  LEFT: 'D',
  UP: 'F',
  RIGHT: 'C',
  DOWN: 'E',
};

const ESC_LB = Buffer.alloc(2, '1b5b', 'hex').toString();

class CursorController {
  move(offset, direction) {
    const code = `${ESC_LB}${offset}${direction}`;
    process.stdout.write(code);
    return code;
  }
}

const controller = new CursorController();
let s =
  '>========<>========<>========<>========<>========<>========<>========<>========<\n';

console.log(
  '>========<>========<>========<>========<>========<>========<>========<>========<'
);
s += controller.move(1, CURSOR_DIRECTION.UP);
s += '\n';
console.log('Hello');
s += 'Hello\n';
console.log(Buffer.from(s).toJSON());

//                               esc [ 1 0 0 0 D
var MOVE_LEFT = Buffer.alloc(0, '1b5b3130303044', 'hex').toString();
//                             esc [ 1 A
var MOVE_UP = Buffer.alloc(0, '1b5b3141', 'hex');
//                                esc [ 0 K
var CLEAR_LINE = Buffer.alloc(0, '1b5b304b', 'hex');
// process.stdout.write('Hello');
// console.log('World');
