const Eslint = require('gulp-eslint');
const Gulp = require('gulp');
const Paths = require('../configs/general').paths;


module.exports = function () {

    return Gulp.src(Paths.js.concat(Paths.tests))
        .pipe(Eslint())
        .pipe(Eslint.format())
        .pipe(Eslint.failAfterError());
};
