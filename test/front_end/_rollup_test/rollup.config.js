import path from 'path';

import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';

export default {
  input: path.resolve(__dirname, 'src/index.js'),
  output: {
    name: 'rollup_test',
    // exports: 'named',
    file: path.resolve(__dirname, 'dist/rollup_test.js'),
    format: 'umd',
    sourcemap: false,
  },
  plugins: [commonjs(), buble()],
  //  json(), stripBanner()
};
