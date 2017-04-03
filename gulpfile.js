var gulp = require('gulp'),
    concat = require('gulp-concat');

var src = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/angular/angular.min.js',
    './node_modules/angular-route/angular-route.min.js',
    './node_modules/angular-resource/angular-resource.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    './src/js/**/*.js'
];

var css = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.css',
    './src/css/**/*.css'
];

var dev = true;

gulp.task('js', function () {
    gulp.src(src)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('css', function () {
    gulp.src(css)
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('fonts', function() {
    return gulp.src([
            './node_modules/bootstrap/dist/fonts/*'])
        .pipe(gulp.dest('dist/fonts/'));
});

if(dev) {
    gulp.task('default', ['js', 'css', 'fonts'], function () {
        gulp.watch('./src/**/*', ['js', 'css', 'fonts']);
    });
} else {
    gulp.task('default', ['js', 'css', 'fonts']);
}
