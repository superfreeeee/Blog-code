const compose = (...fnList) => {
  // no func
  if (fnList.length === 0) {
    return (arg) => arg;
  }

  // [f1, f2, f3]
  // (f1, f2) ===> f12 = (...args) => f1(f2(...args))
  // (f12, f3) ===> f123 = (...args) => f12(f3(...args)) => f1(f2(f3(...args)))
  return fnList.reduce(
    (f1, f2) =>
      (...args) =>
        f1(f2(...args))
  );
};

const removeComment = (s) => {
  return s.replace(/\/\/.*$/gm, '');
};

const removeWhiteSpace = (s) => {
  return s.replace(/[ \n\t]*/g, '');
};

module.exports = function (source) {
  // console.log(`Solve jsonc: '${source}'`);

  // const noComment = removeComment(source);
  // console.log(`noComment: '${noComment}'`);

  // const noWhiteSpace = removeWhiteSpace(noComment);
  // console.log(`noWhiteSpace: '${noWhiteSpace}'`);

  // const data = JSON.parse(noWhiteSpace);
  // console.log(`Parsed data:`, data);

  // const res = JSON.stringify(data);
  // console.log(`res: ${res}`);

  // return `module.exports = ${res}`;

  return compose(
    (s) => `module.exports = ${s}`,
    JSON.stringify,
    JSON.parse,
    removeWhiteSpace,
    removeComment
  )(source);
};
