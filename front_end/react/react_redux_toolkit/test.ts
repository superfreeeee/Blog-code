const s1: symbol = Symbol();
let s2: symbol = Symbol();

const s3: unique symbol = Symbol();
// let s4: unique symbol = Symbol();
const s4: unique symbol = Symbol();
s1 === s2 && console.log('s1 equals s2');
s2 === s3 && console.log('s2 equals s3');
s3 === s4 && console.log('s2 equals s3');
