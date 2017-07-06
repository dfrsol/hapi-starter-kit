const Webpack = require('webpack');
const Config = require('./webpack.server.js');
const GeneralConfig = require('./general.js');


Config.cache = true;

Config.entry.unshift(
    'webpack/hot/poll?1000'
);

Config.output.publicPath = 'http://' + GeneralConfig.hostname + ':' + GeneralConfig.port + '/dist';

Config.plugins = [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoEmitOnErrorsPlugin()
];


module.exports = Config;
