var gulp        = require('gulp')
var jade        = require('gulp-jade')
var rename      = require("gulp-rename")
var mustache    = require("gulp-mustache")
var runSequence = require('run-sequence')

// Render works.mustache [gulp mustache]

gulp.task("mustache", function() {
  return gulp.src("./src/works.mustache")
    .pipe(mustache('./src/works.json',{},{}))
    .pipe(rename('works.html'))
    .pipe(gulp.dest("./"))
})

// Render index.jade [gulp jade]

gulp.task('jade', function() {
  return gulp.src('./src/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'))
})

// Do both [gulp]

gulp.task('default', function() {
  runSequence('mustache','jade')
})
