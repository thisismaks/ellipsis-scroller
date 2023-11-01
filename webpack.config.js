const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx'],
    },
    externals: {
        react: 'react',
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true,
                                // localIdentName: "foo__[name]__[local]",
                                localIdentName: "[hash:base64:5]",
                            },
                        },
                    },
                ],
            },
        ],
    }
}