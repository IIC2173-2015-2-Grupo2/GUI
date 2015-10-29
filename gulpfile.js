var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    connect     = require('gulp-connect'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    ngmin       = require('gulp-ngmin'),
    uglify      = require('gulp-uglify'),
    ngAnnotate  = require('gulp-ng-annotate'),
    minifyHTML  = require('gulp-minify-html'),
    sass        = require('gulp-sass'),
    minifyCss   = require('gulp-minify-css'),
    uglifycss   = require('gulp-uglifycss');

// define the default task and add the watch task to it
gulp.task('default', ['build', 'connect', 'watch']);

// build task, it must group all related tasks
gulp.task('build', ['concat', 'build-css', 'jshint']);

gulp.task('concat', ['move-templates'], function () {
  gulp.src(['source/**/modules.js', 'source/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(ngmin())
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public'));
});

gulp.task('move-templates', function() {
  var opts = {
    conditionals: true,
    spare: true
  };

  gulp.src(['source/templates/**/*'])
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest('public/templates'));
});

gulp.task('build-css', function() {
  return gulp.src('source/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(uglifycss())
    .pipe(rename({suffix: '.min'}))
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
