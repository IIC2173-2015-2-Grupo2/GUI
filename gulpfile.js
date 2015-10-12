var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    connect = require('gulp-connect');

// define the default task and add the watch task to it
gulp.task('default', ['build', 'connect', 'watch']);

// build task, it must group all related tasks
gulp.task('build', ['jshint', 'build-css']);

// local server
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./index.html')
    .pipe(connect.reload());
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/assets/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function() {
  return gulp.src('source/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/assets/stylesheets'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('./**/*.html', ['html']);
  gulp.watch('source/assets/javascript/**/*.js', ['jshint']);
  gulp.watch('source/assets/scss/**/*.scss', ['build-css']);
});
