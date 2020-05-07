const path = require('path')
const webpack = require("webpack");
var config = require('./config');

module.exports = {
    entry: config.library,
    output: {
        path: path.join(__dirname, "public/vendor"),
        filename: "[name].dll.js",
        library: "[name]_[hash]" // vendor.dll.js中暴露出的全局变量名
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: { javascriptEnabled: true }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            // manifest缓存文件的请求上下文
            context: process.cwd(),

            // manifest.json文件的输出位置
            path: path.join(__dirname, 'public/vendor', '[name]-manifest.json'),

            // 定义打包的公共vendor文件对外暴露的函数名
            name: '[name]_[hash]'
        })
    ]
}
