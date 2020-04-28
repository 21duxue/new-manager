一、初始化项目

创建项目文件，就叫 react-architecture 吧。
初始化git  git init
初始化npm npm init
当然不能一口气的只讲配置，so 我们简单的创建一些文件和目录，跑起来看一看效果。目录结构如下：

```
├── src                     
│   ├── index.html                
│   └── index.js                              
├── .gitignore
├── package-lock.json
├── package.json
└── webpack.config.js
```

复制代码我们先来配置下webpack，暂时先不管其他。
二、webpack.config.js 的配置

安装一些依赖:  为了webpack运行，需要安装（我用了webpack3+）

    npm install -D webpack@3 webpack-dev-server@2 html-webpack-plugin
react，需要安装

```
npm install -S react react-dom react-router-dom
```
    
处理less，需要安装

```
npm install -D css-loader style-loader less less-loader
```

    
处理图片和字体文件，需要安装

```
npm install -D url-loader file-loader
```

    
为了支持高级语法-babel，需要安装

```
npm install -S babel-polyfill // 实际生产环境也会用到
npm install -D babel-core babel-loader babel-preset-env babel-preset-react babel-preset-stage-2 
```


webpack.config.js 配置

```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry:{
        main:['babel-polyfill','./src/index.js'],
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {  
                test: /\.(woff|eot|ttf|svg|png|jpg)$/,  
                use: [  
                    {  
                        loader: 'url-loader',  
                        options: {  
                            limit: '1024'  
                        }  
                    },  
                ]  
            },
            {  
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [  
                    {  
                        loader: 'url-loader',  
                        options: {  
                            limit: '1024'  
                        }  
                    },  
                ]  
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    { 
                        loader: 'css-loader',
                        options: { importLoaders: 1 } 
                    },
                    'less-loader'
                ]
            },
            {
                test:/\.(js|jsx)$/,
                use:"babel-loader",
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'}),
    ],
    devServer:{
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        proxy: {
            "/api": {
              target: "http://127.0.0.1:3000/",
              pathRewrite: {"^/api" : ""}
            }
          }
    }
}
```




babel的配置
创建.babelrc文件

```
{
    "presets": [
        ["env",{
            "targets": {
                "browsers": ["IE >= 9"]
            },
            "useBuiltIns": true
        }],
        "react",
        "stage-2"
    ]
}
```



index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>react-architecture</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```



index.js
万变不离 Hello World~

```
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
    <h1>Hello World!</h1>,
    document.getElementById('root')
)
```


在package.json的 scripts 添加启动命令

    "start": "webpack-dev-server --open"

命令行 运行 npm start 就可以看效果了
