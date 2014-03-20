var browserify = require('gulp-browserify'),
    nodemon = require('gulp-nodemon'),
    less = require('gulp-less');

    gulp = require('gulp');

gulp.task('recess', function () {
//    gulp.src('./public/css/styles.less')
//        .pipe(less())
//        .pipe(gulp.dest('./public/css/'));
});


gulp.task('js', function() {
    gulp.src('app/app.js')
        .pipe(browserify({
//            insertGlobals : true,
            shim: {
                jquery: {
                    path: 'assets/vendor/jquery-1.9.1.min.js',
                    exports: 'jquery'
                }
            }
        }))
        .pipe(gulp.dest('public/mergedAssets.js'));
});

gulp.task('server', function () {
  nodemon({ script: 'app.js', options: '-e html,js -i main.css' });
});
