var gulp = require('gulp');
var jscs = require('gulp-jscs');
var eslint = require('gulp-eslint');

gulp.task('vet', function() {
	return gulp
		.src([
			'./src/**/*.js'
		])
		.pipe(jscs({fix:true}))
		.pipe(jscs.reporter());
});

gulp.task('lint', function() {
	return gulp
		.src([
			'./src/**/*.js'
		])
		.pipe(eslint())
		.pipe(eslint.format('unix'))
		.pipe(eslint.failAfterError());
});