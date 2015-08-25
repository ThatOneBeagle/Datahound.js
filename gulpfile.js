var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default', function () {
	return gulp.src("src/datahound.js")
	 .pipe(uglify({preserveComments: 'all'}))
	 .pipe(gulp.dest('dist'))
});