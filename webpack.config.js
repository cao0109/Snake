const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts', //入口文件
    output: {
        filename: 'bundle.js', //打包后的文件名
        path: path.resolve(__dirname, 'dist'), //打包后的目录，必须是绝对路径
        environment: {
            arrowFunction: false, //不使用箭头函数
        }
    },
    module: { //对模块的处理逻辑
        rules: [ //规则，可以有多个规则
            {
                test: /\.ts$/, //用正则去匹配要用该loader转换ts文件
                use: [
                    //配置babel
                    {
                        loader: 'babel-loader',  //指定加载器
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env", //指定环境的插件
                                    {
                                        targets: {
                                            "chrome": "88", //指定兼容的浏览器版本
                                            "ie": "11",
                                        },
                                        "corejs": "3", //指定corejs版本
                                        "useBuiltIns": "usage" //按需加载
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
                exclude: /node_modules/  //不包括
            },
            //设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }

                        }
                    },
                    "less-loader"]
            }
        ]
    },
    mode: "development", //打包模式
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
                title: "webpack",
                template: "./src/index.html"
            }
        ),
    ],
    resolve: { //配置解析 设置引用模块时候的后缀
        extensions: ['.ts', '.js'] //配置解析文件的后缀名
    }
}
