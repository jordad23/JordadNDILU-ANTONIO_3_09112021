'use strict';

const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const gulpConcat = require("gulp-concat");
const sass = require('gulp-sass')(require('sass'));
const ejs = require("gulp-ejs");
const sourcemaps = require('gulp-sourcemaps');

function makeCss() {
  return gulp.src([
      './src/scss/base.scss', 
      './src/scss/mixin.scss', 
      './src/**/*.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(gulpConcat("style.css"))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest('./www/css'));
};

function makeHtml() {
  return gulp.src('./src/pages/*.html')
    .pipe(ejs())
    .pipe(gulp.dest('./www'));
}

exports.makeCss = makeCss;
exports.watch = function () {
  browserSync.init({
    server: {
      baseDir: "./www"
    }
  });
  gulp.watch('./src/**/*.scss', makeCss);
  gulp.watch('./src/**/*.html', makeHtml);
  gulp.watch("./www").on('change', browserSync.reload);
};

