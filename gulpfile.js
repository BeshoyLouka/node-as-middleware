var browserify = require('gulp-browserify'),
    nodemon = require('gulp-nodemon'),
    less = require('gulp-less'),
    handlebars = require('gulp-handlebars'),
    defineModule = require('gulp-define-module'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat'),

    gulp = require('gulp');

gulp.task('recess', function () {
//    gulp.src('./public/css/styles.less')
//        .pipe(less())
//        .pipe(gulp.dest('./public/css/'));
});


gulp.task('hbs', function(){
  gulp.src(['app/templates/**/*.hbs'])
    .pipe(handlebars())
    .pipe(defineModule('commonjs'))
    // should pipe another function here to filter __ templates
    .pipe(concat('compiledTemplates.js'))
    .pipe(gulp.dest('app/templates/'));
});

gulp.task('js', function() {
    gulp.src('app/app.js')
        .pipe(browserify({
            insertGlobals : true,
            shim: {
                jquery: {
                    path: 'assets/vendor/jquery-1.9.1.min.js',
                    exports: '$'
                }
            }
        }))
        .pipe(gulp.dest('public/mergedAssets.js'));
});

gulp.task('server', function () {
  nodemon({ script: 'app.js', options: '-e html,js -i main.css' });
});
