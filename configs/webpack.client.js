const Path = require('path');
const Webpack = require('webpack');


module.exports = {
    entry: {
        app: ['babel-polyfill', Path.resolve(__dirname, '../assets/js/app.js')]
    },
    output:  {
        path: Path.join(__dirname, '..', 'dist', 'static', 'js'),
        filename: '[name].bundle.js'
    },
    module:  {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/
            }
        ],
        noParse: /\.min\.js/
    },
    plugins: [
        new Webpack.EnvironmentPlugin([
            'NODE_ENV'
        ])
    ],
    cache: false,
    context: __dirname,
    devtool: 'source-map',
    node:    {
        __dirname: true,
        fs: 'empty'
    }
};
