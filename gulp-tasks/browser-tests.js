const Del = require('del');
const Path = require('path');
const Server = require('karma').Server;


const internals = {};


/**
 * Run test once and exit
*/
module.exports = function (done) {

    const config = {
        configFile: Path.resolve(__dirname, '../configs/karma.js'),
        browsers: ['Firefox']
    };

    if (process.env.TRAVIS_OS_NAME) {
        config.browsers.push('Chrome_travis_ci');
    }
    else {
        config.browsers.push('Chrome');
    }

    Del.sync(['./coverage/karma/**']);
    new Server(config, done).start();
};
