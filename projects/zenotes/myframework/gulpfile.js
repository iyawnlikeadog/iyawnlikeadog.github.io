var gulp                = require('gulp');
var concat              = require('gulp-concat');
var cleanCSS            = require('gulp-clean-css');
var sourcemaps          = require('gulp-sourcemaps');
var uglify              = require('gulp-uglify');

var myframework_ver     = "0.1";
var myframework_dir     = "D:/Work/Portable - UwAmp/www/myframework/v" + myframework_ver + '/';
var myframework_builder = require(myframework_dir + 'myframework-builder.js');
var js = [];
var css = [];



var pluginsToAdd = [
	'jQuery',
	'prefixFree',
	// 'imagesLoaded',
	// 'masonry',
	// 'matchHeight',
	// 'wow',
	// 'animate.min.css',
	// 'owlCarousel',
	'my/parallax',
	'my/smooth-scroll',
	'my/nav'
];



gulp.task('default', function() {

	// Create CSS & JS blobs
	myframework_builder.addPlugins(pluginsToAdd,js,css,myframework_dir);

	// Take all js files
	// Combine
	// Minify
	// Create sourcemap
	// Copy
	gulp.src(js)
			.pipe(sourcemaps.init())
			.pipe(concat('all.js'))
			.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./'));

	// Take all css files
	// Combine
	// Minify
	// Create sourcemap
	// Copy
	gulp.src(css)
			.pipe(sourcemaps.init())
			.pipe(concat('all.css'))
			.pipe(cleanCSS())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./'));

	// Take all sass files
	// Copy
	gulp.src(myframework_dir + 'css/sass/*')
			.pipe(gulp.dest('./sass/'));

});
