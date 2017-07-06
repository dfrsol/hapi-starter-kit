const Gulp = require('gulp');
const JsonLint = require('gulp-jsonlint');


module.exports = function () {

    return Gulp.src(['**/*.json', '!coverage/**', '!node_modules/**'])
        .pipe(JsonLint())
        .pipe(JsonLint.reporter());
};
