const path = require('path');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        publicPath: 'dist/js/',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    vue: {
        loaders: {
            js: 'babel'
        }
    }
}