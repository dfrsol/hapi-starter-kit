const Gulp = require('gulp');
const GulpTasks = require('gulp-task-loader');
const Paths = require('./configs/general').paths;

GulpTasks('./gulp-tasks');

Gulp.task('lint', ['jsonlint', 'packagelint', 'scsslint', 'eslint-js']);

Gulp.task('afterDeploy', ['lobster']);

Gulp.task('watch', ['scss'], () => {

    Gulp.watch(Paths.sass, ['scss']);
});
