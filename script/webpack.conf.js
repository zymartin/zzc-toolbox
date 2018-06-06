const webpack = require( 'webpack' )
const path = require( 'path' )

const pkg = require( '../package.json' )

const rootPath = path.resolve( __dirname, '../' )

const config = {
    entry: path.resolve( rootPath, 'src', 'index.js' ),
    output: {
        filename: `${pkg.name}.min.js`,
        path: path.resolve( rootPath, 'min' ),
        // library: `${pkg.name}`,
        library: 'barryPkg',// 包名字
        libraryTarget: "umd"
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            options: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}



module.exports = config;