const Del = require('del');
const Gulp = require('gulp');
const Path = require('path');
const PluginError = require('gulp-util').PluginError;
const Through = require('through2').obj;
const LibCoverage = require('nyc/node_modules/istanbul-lib-coverage');
const LibReport = require('nyc/node_modules/istanbul-lib-report');
const Reports = require('nyc/node_modules/istanbul-reports');

const GeneralConfig = require('../configs/general');


const PLUGIN_NAME = 'sumate-coverage-reports';
let mergedCoverageMap = null;


const plugin = function (opts) {

    const reporters = opts.reporter || ['json', 'html', 'text', 'lcov'];
    const dir = opts.dir || Path.join(__dirname, '../coverage/combined');
    const thresholds = opts.thresholds || {};
    const cover = Through((file, encoding, cb) => {

        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        }
        else if (file.isBuffer()) {
            /* covert all the JSON reports into a coverage map */
            const map = LibCoverage.createCoverageMap(JSON.parse(file.contents.toString()));

            /* Merge the new coverage map into the previously created ones */
            if (mergedCoverageMap !== null) {
                mergedCoverageMap.merge(map);
            }
            else {
                mergedCoverageMap = map;
            }

            return cb(null, file);
        }
    }).on('end', () => {
        /* Once all maps are created and merged. Identify the place to write the reports to */
        const context = LibReport.createContext({ dir });
        const tree = LibReport.summarizers.pkg(mergedCoverageMap);

        /* Write the desired reports */
        reporters.forEach((reporter) => {

            tree.visit(Reports.create(reporter), context);
        });
    }).resume();

    let thresholdKeys = Object.keys(thresholds);

    if (thresholdKeys.length) {
        cover.on('end', () => {

            const summary = mergedCoverageMap.getCoverageSummary();

            if (thresholdKeys.length === 1 && thresholdKeys[0] === 'global' ) {
                thresholdKeys = ['lines', 'functions', 'branches', 'statements'];
                thresholdKeys.forEach((key) => {

                    thresholds[key] = thresholds.global;
                });
            }
            // ERROR: Coverage for lines (90.12%) does not meet global threshold (120%)
            thresholdKeys.forEach((key) => {

                const coverage = summary[key].pct;
                if (coverage < thresholds[key]) {
                    process.exitCode = 1;
                    console.log('COVERAGE FAILED: Coverage for ' + key + ' (' + coverage + '%) does not meet global threshold (' + thresholds[key] + '%)'); // eslint-disable-line no-console
                }
            });

            if (process.exitCode === 1) {
                this.emit('error', new PluginError(PLUGIN_NAME, 'Coverage failed'));
            }
        }).resume();
    }


    Del.sync([dir + '/**']);

    return cover;
};

module.exports = () => {

    return Gulp.src('./coverage/**/coverage-final.json')
        .pipe(plugin(GeneralConfig.coverage));
};
