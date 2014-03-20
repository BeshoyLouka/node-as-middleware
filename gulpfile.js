var source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    browserify = require('browserify'),
    nodemon = require('gulp-nodemon'),
    less = require('gulp-less');
    uglify = require('gulp-uglify'),

    gulp = require('gulp');

gulp.task('recess', function () {
//    gulp.src('./public/css/styles.less')
//        .pipe(less())
//        .pipe(gulp.dest('./public/css/'));
});

gulp.task('browserify', function() {
  var bundleStream = browserify('index.js').bundle();

  bundleStream
    .pipe(source('index.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./bundle.js'));
});

gulp.task('server', function () {
  nodemon({ script: 'app.js', options: '-e html,js -i main.css' });
});
