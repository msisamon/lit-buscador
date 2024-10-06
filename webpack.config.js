const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const generateHtmlPlugins = (templateDir) => {
    const templates = fs.readdirSync(templateDir).filter(file => file.endsWith('.html'));
    return templates.map(template => {
        return new HtmlWebpackPlugin({
            template: path.join(templateDir, template),
            filename: path.join('pages', template),
            inject: 'body',
        });
    });
};

module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    devServer: {
        static: './dist',
        hot: true,
        open: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
        }),
        ...generateHtmlPlugins(path.resolve(__dirname, 'pages')),
    ],
    mode: 'development',
};
