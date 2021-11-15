const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');

const BASE_TS_CONFIG_PATH = './tsconfig.json';
const BASE_BABELRC_PATH = './.babelrc';
const CJS_TARGET_PATH = 'lib/';
const ES_TARGET_PATH = 'es/';

gulp.task('clean', async () => {
  await del('lib'); // cjs module
  await del('es'); // es module
  await del('dist'); // dist module
});

const BUILD_CONFIG = {
  CJS: {
    module: 'CommonJS',
    dest: CJS_TARGET_PATH,
  },
  ES: {
    module: 'ESNext',
    dest: ES_TARGET_PATH,
  },
};

const createTsProjectTask = (config) => {
  return () => {
    const tsProject = ts.createProject(BASE_TS_CONFIG_PATH, {
      module: config.module,
    });
    return tsProject
      .src()
      .pipe(tsProject())
      .pipe(babel({ configFile: BASE_BABELRC_PATH }))
      .pipe(gulp.dest(config.dest));
  };
};

/**
 * 打包 CommonJS 规范结果
 */
gulp.task('cjs', createTsProjectTask(BUILD_CONFIG.CJS));

/**
 * 打包 ES Module 规范
 */
gulp.task('es', createTsProjectTask(BUILD_CONFIG.ES));

/**
 * 添加类型说明文件
 */
gulp.task('declaration', () => {
  const tsProject = ts.createProject(BASE_TS_CONFIG_PATH, {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest(CJS_TARGET_PATH))
    .pipe(gulp.dest(ES_TARGET_PATH));
});

exports.default = gulp.series('clean', 'cjs', 'es', 'declaration');
