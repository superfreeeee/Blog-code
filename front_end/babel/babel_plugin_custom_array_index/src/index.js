const a = [1, 2, 3, { b: [1, 2, 3, 4] }, 4, 5];
console.log(`a =`, a);
console.log(`a[0] =`, a[0]);
console.log(`a[-1] =`, a[-1]);
console.log(`a[+1] =`, a[+1]);
console.log(`a['-1'] =`, a['-1']);
console.log(`a[-3] =`, a[-3]);
console.log(`a[-3].b[-2] =`, a[-3].b[-2]);
