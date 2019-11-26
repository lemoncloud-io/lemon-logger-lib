const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
    mode: 'production',
    context: __dirname + '/src',
    entry: {
        LemonLib: './',
    },
    output: {
        path: __dirname + '/dist',
        filename: 'lemon.libs.js',
        libraryTarget: 'umd',
        library: ['[name]'], // LemonLib
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
        ],
    },
    plugins: [new CheckerPlugin()],
};
