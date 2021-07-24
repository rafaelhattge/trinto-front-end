'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

function build() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'))
};

exports.build = build;
exports.watch = function () {
    gulp.watch('src/sass/**/*.scss', gulp.series(build));
};