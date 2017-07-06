const Autoprefixer = require('gulp-autoprefixer');
const Gulp = require('gulp');
const Sass = require('gulp-sass');
const Config = require('../configs/general');


const sassConfig = {
    sass: {
        outputStyle: 'compressed'
    },
    prefixer: {
        browsers: [
            'Explorer >= 9',
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'Safari >= 6',
            'iOS >= 6',
            'last 2 Android versions',
            'Firefox ESR'
        ]
    }
};


module.exports = function () {

    return Gulp.src(Config.paths.sass)
        .pipe(Sass(sassConfig.sass).on('error', Sass.logError))
        .pipe(Autoprefixer(sassConfig.prefixer))
        .pipe(Gulp.dest('dist/static/css/'));
};
