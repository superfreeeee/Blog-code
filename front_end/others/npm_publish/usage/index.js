const { tryParse, tryStringify } = require('@youxian/test-pkg');

const data1 = tryParse('{"hello": 123}');
const data2 = tryStringify(data1);
const data3 = tryParse('{"hello": 123');
const data4 = tryStringify({ hello: function () {} });

console.log('data1', data1);
console.log('data2', data2);
console.log('data3', data3);
console.log('data4', data4);
