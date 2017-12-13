var gulp        = require('gulp')
var jade        = require('gulp-jade')
var uglify      = require('gulp-uglify')
var browserify  = require("browserify")
var rename      = require("gulp-rename")
var runSequence = require('run-sequence')
var mustache    = require("gulp-mustache")

var babelify    = require('babelify')
var source      = require('vinyl-source-stream')
var buffer      = require('vinyl-buffer')
var sourcemaps  = require('gulp-sourcemaps')
var livereload  = require('gulp-livereload')

// Render .mustache [gulp mustache]

gulp.task("mustache", function() {
  return gulp.src("./src/mustache/*")
    .pipe(mustache('./src/json/data.json',{},{}))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest("./temp/"))
})

// Render index.jade [gulp jade]

gulp.task('jade', function() {
  return gulp.src('./src/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'))
})

// Build JS [gulp js]

gulp.task('js', function () {
  return browserify({entries: './src/js/app.js', debug: true})
    .transform("babelify", { presets: ["es2015"] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/js'))
    .pipe(livereload())
})

// Watch

gulp.task('watch', ['js'], function () {
  livereload.listen()
  gulp.watch('./src/js/*/**', ['js'])
})


// gulp.task('js', function() {
//   browserify('src/js/app.js')
//     .transform('babelify', { presets: ['env'] })
//     .bundle()
//     .pipe(fs.createWriteStream('assets/js/app.js'))
//     .pump([
//       gulp.src('assets/js/app.js'),
//       uglify(),
//       gulp.dest('./')
//     ])
    // .pipe(gulp.dest('assets/js'))
  // return gulp.src('src/js/app.js')
  //   .pipe(babel({
  //     presets: ['env']
  //   }))
  //   .pipe(gulp.dest('assets/js'))
// })

// Do both [gulp]

gulp.task('default', function() {
  runSequence('mustache','jade', 'js')
})
