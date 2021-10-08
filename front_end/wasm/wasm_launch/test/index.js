const { load } = require('./loadWasm');
const { sumInJs, facInJs } = require('./test');

const getCurrentTime = () => new Date().getTime();

const createSumTest = (sum) => () => {
  sum(1500);
};

const createFacTest = (fac) => () => {
  fac(40);
};

const calcTime = (test) => {
  let time = getCurrentTime();

  test();

  time = getCurrentTime() - time;
  return time;
};

const compare2Versions = (fnInC, fnInJs, testCreator) => {
  const tag = `> ${testCreator.name.substring(6)}`;
  const timeA = calcTime(testCreator(fnInC));
  const timeB = calcTime(testCreator(fnInJs));
  console.log(`${tag}\tin C: ${timeA}   \tin Js: ${timeB}\tdelta: ${timeB - timeA}\ttimes: ${timeB / timeA}`);
};

load('./test.wasm')
  .then(({ fac: facInC, sum: sumInC }) => {
    while (true) {
      compare2Versions(sumInC, sumInJs, createSumTest);
      compare2Versions(facInC, facInJs, createFacTest);
    }
  })
  .catch((err) => {
    console.log('err', err);
  });

let showDetail = false;
