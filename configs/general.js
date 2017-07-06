const Path = require('path');


const root = Path.join(__dirname, '..');
const hmr_port = /* istanbul ignore next */ process.env.hmr_port || 8081;


module.exports = {
    hostname: process.env.HOSTNAME || 'localhost',
    hmr_port,
    port: process.env.VCAP_APP_PORT || process.env.PORT || 8000,
    'report-cov': false,
    webServer: /* istanbul ignore next */ (process.env.NODE_ENV === 'production') ? '' : `//localhost:${hmr_port}`,
    'report-cov': false,
    coverage: {
        dir: root + '/coverage/combined',
        reporters: ['json', 'html', 'text', 'lcov'],
        thresholds: {
            global: 100
        }
    },
    paths: {
        sass: [root + '/assets/styles/**/*.scss'],
        js: [
            root + '/**/*.js',
            '!' + root + '/+(.git|coverage|dist|node_modules)/**/*.js'
        ],
        tests: [
            root + '/test/**/*.js',
            '!node_modules/**'
        ],
        json: [
            '**/*.json',
            '!coverage/**',
            '!node_modules/**'
        ]
    }
};
