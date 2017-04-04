var webpack = require('webpack');
var path = require('path');
var dev = process.env.NODE_ENV !== 'production';

module.exports = {
	context: path.join(__dirname, 'src'),
	devtool: dev ? 'inline-sourcemap' : null,
	entry: './main.js',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0'],
					plugins: ['react-html-attrs', 'transform-decorators-legacy']
				}
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				loader: 'style!css!less'
			}
		]
	},
	output: {
		path: path.join(__dirname, 'bin'),
		filename: dev ? 'client.js' : 'client.min.js'
	},
	plugins: dev ? [] : [
		new webpack.DefinePlugin({
			'process.env': { 
				NODE_ENV: JSON.stringify('production') 
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
	],
};