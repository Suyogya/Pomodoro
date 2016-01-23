var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config');

var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('jscs', function() {
	return gulp
		.src(config.alljs)
		.pipe($.jscs({fix:true}))
		.pipe($.jscs.reporter());
});

gulp.task('lint', function() {
	return gulp
		.src(config.alljs)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.eslint())
		.pipe($.eslint.format('unix'))
		.pipe($.eslint.failAfterError());
});