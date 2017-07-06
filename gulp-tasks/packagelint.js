const Gulp = require('gulp');
const GulpUtil = require('gulp-util');
const Packagelint = require('gulp-nice-package');
const Mapstream = require('map-stream');


module.exports = function () {

    return Gulp.src('package.json')
        .pipe(Packagelint('npm', {
            warnings: false
        }))
        .pipe(Mapstream((file, cb) => {

            if (!file.nicePackage.valid) {
                throw new GulpUtil.PluginError({
                    plugin: 'packagelint',
                    message: 'Failed with an error'
                });
            }

            cb(null, file);
        }));
};
