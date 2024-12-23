const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// https://webpack.js.org/guides/typescript/
module.exports = {
    devtool: "eval-source-map", // Esto habilita las asociaciones js->ts, https://webpack.js.org/configuration/devtool/#development
    entry: './src/index.ts',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|wav)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        alias: {
            // Una entrada por cada carpeta externa
            // '@shared': path.resolve('../shared/src/')
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        devMiddleware: {
            writeToDisk: true
        },
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/assets/index.html'
    })],
};