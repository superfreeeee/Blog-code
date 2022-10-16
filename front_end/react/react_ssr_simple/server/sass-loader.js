const sass = require('sass');
// const nodeSass = require('node-sass');

module.exports = (data, file) => {
  console.log(`[my-sass-loader] data`, data);
  console.log(`[my-sass-loader] file`, file);

  try {
    const res = sass.compile(file).css.toString('utf8');
    console.log(`[my-sass-loader] res`, res);
    return res;
  } catch (e) {
    console.error(`[my-sass-loader] error`, e);
  }
};
