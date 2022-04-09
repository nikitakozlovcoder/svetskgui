'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
//var pug = require('gulp-pug');

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.*')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.sass', ['sass']);
});

