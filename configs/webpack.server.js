const NodeExternals = require('webpack-node-externals');
const Path = require('path');
const Webpack = require('webpack');

module.exports = {
    entry:   [Path.resolve(__dirname, '..', 'lib', 'start.js')],
    output:  {
        path: Path.join(__dirname, '../dist'),
        filename: 'server.js'
    },
    plugins: [
        new Webpack.EnvironmentPlugin([
            'NODE_ENV'
        ])
    ],
    module:  {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/
            },
            {
                use: 'json-loader',
                test: /\.json$/
            }
        ],
        noParse: /\.min\.js/
    },
    externals: [NodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
    target:  'node',
    cache:   false,
    context: Path.resolve(__dirname, '..'),
    devtool: 'source-map',
    node:    {
        __dirname: true,
        fs: 'empty'
    }
};
