const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    return Object.assign({
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/, // convert all file '.js' to es5
                exclude: '/node_modules'
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }]
        }
    }, (isProduction ? production : development));
};

const development = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
}

const production = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJsPlugin()
    ]
}