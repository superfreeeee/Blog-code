const gulp = require('gulp')
const less = require('gulp-less')
const sass = require('gulp-sass')

const tasks = [
  {
    name: 'less',
    src: 'src/less/*.less',
    plugin: less,
    option: {},
    dest: 'lib/less',
  },
  {
    name: 'scss',
    src: 'src/scss/*.scss',
    plugin: sass,
    option: { outputStyle: 'expanded' },
    dest: 'lib/scss',
  },
]

tasks.forEach(({ name, src, plugin, option, dest }) => {
  gulp.task(name, (done) => {
    gulp.src(src).pipe(plugin(option)).pipe(gulp.dest(dest))
    done()
  })
})

gulp.task('default', gulp.parallel(...tasks.map((task) => task.name)))

gulp.task('watch', (done) => {
  tasks.forEach(({ name, src }) => {
    console.log(`watch '${src}' and do '${name}'`)
    gulp.watch(src, gulp.task(name))
  })
  done()
})
