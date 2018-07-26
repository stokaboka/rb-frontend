const path = require('path');

const assetsPath = "D:\\ias\\applications\\rb\\static\\assets";
const targetPath = "\\\\ias2\\IAS\\applications\\rb\\static\\assets";

// const assetsPath = "/home/igor/OranGeM/rb/frontend/src/assets";
// const targetPath = "/ias/applications/rb.local/static/assets";

let webpack = require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');

//var debug = process.env.NODE_ENV !== "production";
// var debug = true;
let debug = false;
if(debug){
	process.env.NODE_ENV = 'development';
	//process.env.NODE_ENV = 'testing'
}else{
	process.env.NODE_ENV = 'production';
}

let plugins = [];

//var ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJS = require("uglify-es");
const WebpackShellPlugin = require('webpack-shell-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const ProvidePlugin = new webpack.ProvidePlugin({
	$: "jquery"
	,jQuery: "jquery"
	,_: "underscore"
	,moment: "moment"
	,fileSaver: "file-saver"
	//,d3: "d3"
});
const DefinePlugin = new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' });

const minifyOpts = {};
const pluginOpts = {
	comments: false
};

const UglifyEsPlugin = require('uglify-es-webpack-plugin');

const CompressionWebpackPlugin = require('compression-webpack-plugin')

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = 'source-map';

	// module.exports.plugins = (module.exports.plugins || []).concat([
	// 	new UglifyEsPlugin({ uglify-es options })
	// ]);
}

const minify = new UglifyEsPlugin(
	{
		sourceMap: false,
		mangle: { toplevel: true },
		compress: true
	});

plugins.push( DefinePlugin );
plugins.push( ProvidePlugin );

if( debug ){

	plugins.push(
	new WebpackShellPlugin({
		onBuildExit: [
			"copy /Y " + assetsPath + "\\index.entry.js" + "  " + targetPath + "\\index.entry.js",
			"copy /Y " + assetsPath + "\\index.entry.js.map" + "  " + targetPath + "\\index.entry.js.map"
			// "cp -t " + targetPath + ' ' + assetsPath + "/index.entry.js",
			// "cp -t " + targetPath + ' ' + assetsPath + "/index.entry.js.map"
		]
	})
	);

}else{

	plugins.push(
		new WebpackShellPlugin({
			onBuildExit: [ "copy /Y " + assetsPath + "\\index.entry.js" + "  " + targetPath + "\\index.entry.js" ,
						   "copy /Y " + assetsPath + "\\index.entry.js.gz" + "  " + targetPath + "\\index.entry.js.gz" ]
			// onBuildExit: [ "cp -t " + targetPath + ' ' + assetsPath + "/index.entry.js" ]
		})
	);

	plugins.push( minify );

	plugins.push(
	new CompressionWebpackPlugin({
		asset: '[path].gz[query]',
		algorithm: 'gzip',
		test: /\.js$|\.html$/,
		// test: new RegExp(
		// 	'\\.(' +
		// 	['is', 'css'].join('|') +
		// 	')$'
		// ),
		threshold: 10240,
		minRatio: 0.8
	})
	);

}

module.exports = {
	context: path.resolve( __dirname ),
	devtool: debug ? "source-map" : false,
	// entry: {
	//     vendor: './app/vendor.js',
	//     bundle: './app/bundle.js'
	// },
	// output: {
	//     path: __dirname + "/app/build/",
	//     filename: "[name].js"
	// },
	entry: {index: './src/index'}, // файл для сборки, если несколько - указываем hash (entry name => filename)
	output: {
		//path: path.join(__dirname, 'static/assets') // выходная директория
		path: path.resolve( assetsPath )
		, filename: "[name].entry.js"
	},


	module: {

		loaders: [
			// {
			// 			// 	test: /\.js$/,
			// 			// 	loader: 'babel-loader',
			// 			// 	options: {
			// 			// 		presets: ['@babel/preset-env'],
			// 			// 		plugins: [require('@babel/plugin-proposal-object-rest-spread')]
			// 			// 	}
			// 			//
			// 			// },
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'fonts/Roboto/[name].[ext]',
							publicPath: '/assets/'
						}
					}
				]

			}
		]
	}

	,resolve: {

		extensions: [ '.js' ]
		, mainFields: ["browser", "module", "main"]
		, modules: [
			path.join(__dirname, './node_modules/')
			, path.join(__dirname, './src/fonts/')
			, path.join(__dirname, './src/fonts/Roboto/')
			, path.join(__dirname, './src/')
		]

	}

	,plugins: plugins

	//, watch: false
	, watchOptions: {
		aggregateTimeout: 300
		, poll: 1000
		, ignored: /node_modules/
	}

};
