const Webpack = require('webpack');
const Config = require('./webpack.client.js');
const GeneralConfig = require('./general.js');


Config.cache = true;
Config.devtool = 'cheap-module-eval-source-map';

Config.entry.app.unshift(
    'webpack-dev-server/client?http://' + GeneralConfig.hostname + ':' + GeneralConfig.hmr_port,
    'webpack/hot/only-dev-server'
);

Config.devServer = {
    publicPath: '/dist/js',
    hot: true,
    inline: true,
    lazy: false,
    quiet: true,
    noInfo: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
    host: GeneralConfig.hostname,
    port: GeneralConfig.hmr_port
};

Config.output.publicPath = Config.devServer.publicPath;
Config.output.hotUpdateMainFilename  = 'update/[hash]/update.json';
Config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

Config.plugins = [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoEmitOnErrorsPlugin()
];

module.exports = Config;
