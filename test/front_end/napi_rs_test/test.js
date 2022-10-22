const { sum } = require('./index.js');

function test(cb) {
  const startTime = performance.now();
  // console.log(`[test] start ${startTime}`);

  cb();

  const endTime = performance.now();
  // console.log(`[test] end ${endTime}`);
  console.log(`[test] duration : ${endTime - startTime}`);
}

test(() => {
  let i = 2000;
  while (i-- > 0) {
    sum(1, 3);
  }
});

test(() => {
  let i = 2000;
  while (i-- > 0) {
    sum(1, 3);
  }
});

function sumInJS(x, y) {
  return x + y;
}

test(() => {
  let i = 2000;
  while (i-- > 0) {
    sum(1, 3);
  }
});

test(() => {
  let i = 2000;
  while (i-- > 0) {
    sum(1, 3);
  }
});
