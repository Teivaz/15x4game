const gulp = require('gulp')
require('./gulp/main')

gulp.task('default', ['clean', 'copy', 'build'])
gulp.task('dev', ['build', 'copy', 'watch'])
gulp.task('release', ['set-env-release', 'clean', 'copy', 'build-release'])
