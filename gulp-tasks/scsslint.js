const Gulp = require('gulp');
const Paths = require('../configs/general').paths;
const SassLint = require('gulp-sass-lint');


module.exports = function () {

    return Gulp.src(Paths.sass)
        .pipe(SassLint({
            configFile: '.sass-lint.yml'
        }))
        .pipe(SassLint.format())
        .pipe(SassLint.failOnError());
};
