const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-jade');
const browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css/'))
});

gulp.task('pug', function () {
    return gulp.src('src/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist/'))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('src/*.pug').on('change', gulp.series('pug', browserSync.reload));
    gulp.watch('src/scss/*.scss').on('change', gulp.series('sass', browserSync.reload));
});


gulp.task('w', gulp.series('pug', 'sass', 'browser-sync'), function () {});