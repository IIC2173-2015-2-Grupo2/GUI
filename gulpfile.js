var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    sass    = require('gulp-sass'),
    connect = require('gulp-connect'),
    concat  = require('gulp-concat');

// define the default task and add the watch task to it
gulp.task('default', ['build', 'connect', 'watch']);

// build task, it must group all related tasks
gulp.task('build', ['concat', 'build-css', 'jshint']);

gulp.task('concat', ['move-templates'], function () {
  gulp.src(['source/**/modules.js', 'source/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('move-templates', function() {
  gulp.src(['source/templates/**/*']).pipe(gulp.dest('public/templates'));
});

gulp.task('build-css', function() {
  return gulp.src('source/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/assets/stylesheets'));
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// local server
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('public/index.html')
      .pipe(connect.reload());
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('./**/*.html', ['html', 'move-templates']);
  gulp.watch('source/**/*.js', ['concat', 'jshint']);
  gulp.watch('source/assets/scss/**/*.scss', ['build-css']);
});
