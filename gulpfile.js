var gulp = require( 'gulp' );
var babel = require( 'gulp-babel' );


const path = require( 'path' )
const fs = require( 'fs' )
const ora = require( 'ora' )
const rm = require( 'rimraf' )
const copy = require( 'copy' )
const chalk = require( 'chalk' )
const webpack = require( 'webpack' )
const mocha = require( 'gulp-mocha' )

const config = require( './script/webpack.conf' )
const pkg = require( './package.json' )
const rootPath = path.resolve( __dirname, '../' )


gulp.task( 'lib', function () {
    return gulp.src( ['./src/*/**/*.js', '!**/*.spec.js'] )// ES6 源码存放的路径,去除单元测试文件
        .pipe( babel( {
            presets: ['es2015', 'react', 'stage-0']
        } ) )
        .pipe( gulp.dest( './lib' ) ); //转换成 ES5 存放的路径  
} );

gulp.task( 'min', function () {
    new Promise( ( resolve, reject ) => {
        // 构建全量压缩包
        let building = ora( 'building...' )
        building.start()
        rm( path.resolve( rootPath, 'min', `${pkg.name}.min.js` ), err => {
            if ( err ) throw ( err )
            webpack( config, function ( err, stats ) {
                if ( err ) throw ( err )
                building.stop()
                resolve()
                console.log( chalk.cyan( '  Build complete.\n' ) )
            } )
        } )
    } )
} );

gulp.task( 'test', function () {
    return gulp.src( '**/*.spec.js', { read: false } )
        .pipe( mocha() )
        .once( 'error', err => {
            console.error( err );
            process.exit( 1 );
        } )
        .once( 'end', () => {
            process.exit();
        } );
} )

// gulp.task( 'default', ['lib', 'min'] );
gulp.task( 'default', ['test'] );