/* General */
const paths = require('./paths')
const gulp = require('gulp')
const concat = require('gulp-concat')
const del = require('del')

/* JS */
const browserify = require('gulp-browserify')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')

gulp.task('set-env-release', function(){
	paths.dest = paths.dest_release
})

gulp.task('clean', function(){
	return del(paths.dest + '/*')
})

gulp.task('copy-styles', function(){
	return gulp.src(paths.styles)
	.pipe(gulp.dest(paths.dest))
})
gulp.task('watch-copy-styles', function(){
	return gulp.watch(paths.styles, ['copy-styles'])
})

gulp.task('copy-html', function(){
	return gulp.src(paths.html)
	.pipe(gulp.dest(paths.dest))
})
gulp.task('watch-copy-html', function(){
	return gulp.watch(paths.html, ['copy-html'])
})

gulp.task('build', function(){
	process.env.NODE_ENV = 'development'
	return gulp.src(paths.scripts)
	.pipe(sourcemaps.init())
	.pipe(babel({
		presets: ['react']
	}))
	.pipe(concat('main.js'))
	.pipe(browserify({
		insertGlobals : true,
		debug : true
	}).on('error', e => console.log(e)))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.dest))
})
gulp.task('watch-build', function(){
	return gulp.watch(paths.scripts, ['build'])
})

gulp.task('build-release', function(){
	process.env.NODE_ENV = 'production'
	return gulp.src(paths.scripts)
	.pipe(babel({
		presets: ['react']
	}))
	.pipe(concat('main.js'))
	.pipe(browserify({
		insertGlobals : true,
		debug : false
	}).on('error', e => console.log(e)))
	//.pipe(uglify())
	.pipe(gulp.dest(paths.dest_release))
})

gulp.task('copy', ['copy-styles', 'copy-html'])
gulp.task('watch', ['watch-copy-styles', 'watch-copy-html', 'watch-build'])
