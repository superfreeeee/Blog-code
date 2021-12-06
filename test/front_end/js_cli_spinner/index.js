const out = process.stdout;
console.log('out.isTTY', out.isTTY);
out.write('Hello World!\n');
out.write('1\n');
out.write('2\n');
out.write('3\n');
out.write('4\n');
out.write('5');
out.clearLine(-1);
out.cursorTo(0);
out.write('6\n');
out.write('01234567890');
out.cursorTo(3);
out.write('===');
out.write('?');

out.write('\n');
