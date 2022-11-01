require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  extensions: ['.js', '.ts', '.jsx', '.tsx', 'json'],
});

require('./index.ts');
