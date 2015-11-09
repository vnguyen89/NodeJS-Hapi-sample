"use strict";
var gulp = require('gulp'),
	ts = require('gulp-typescript'),
	nodemon = require('gulp-nodemon'),
	livereload = require('gulp-livereload'),
	mocha = require('gulp-mocha'),
	merge = require('merge2'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	replace = require('gulp-replace'),
	buildDirectory = './build',
	buildTypingDirectory = './typings';

gulp.task('typescript', function () {
	console.log('Compiling typescript');
	var tsResult = gulp.src(['source/**/*.ts'])
		.pipe(ts({
			noImplicitAny: true,
			declaration: true,
			//noExternalResolve : true,
			removeComments: true,
			module: 'commonjs'
		}));

	//return tsResult.js.pipe(gulp.dest(buildDirectory));

	return merge([
		tsResult.dts.pipe(concat('server.d.ts')).pipe(gulp.dest(buildTypingDirectory)),
		tsResult.js
		// .pipe(concat('server.js'))
		// .pipe(sourcemaps.write())
			.pipe(gulp.dest(buildDirectory)),
	]);
});

gulp.task('typescript-test', ['typescript'], function () {
	console.log('Compiling test script');
	return gulp.src(['test/**/*.ts', 'typings/tsd.d.ts'])
		.pipe(ts({
			//noExternalResolve : true,
			removeComments: true,
			module: 'commonjs',
		})).js
		.pipe(replace('source/', 'build/'))
		.pipe(gulp.dest('./test'));
});

gulp.task('test', ['typescript-test'], function () {
	console.log("Running test....");
	return gulp.src('test/test.js', { read: false })
		.pipe(mocha())
		.once('end', function () {
			process.exit();
		});
})

gulp.task('watch', function () {
	gulp.watch('./source/**/*.ts', ['typescript']);
});

gulp.task('serve', ['typescript'], function () {
	livereload.listen();
	nodemon({
		script: 'build/server.js',
		ext: 'js',
	}).on('restart', function () {
		setTimeout(function () {
			livereload.changed();
		}, 500);
	});
});

gulp.task('build', ['typescript', 'test']);

gulp.task('deploy', ['build'], function () {
	return gulp.src(['package.json'])
		.pipe(gulp.dest(buildDirectory));
});


gulp.task('default', ['deploy']);