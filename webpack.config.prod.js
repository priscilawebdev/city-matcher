/**
 * PRODUCTION WEBPACK CONFIGURATION
 */

// Important modules this config uses
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = require('./webpack.config.base')({
	// In production, we skip all hot-reloading stuff
	entry: [
		path.join(process.cwd(), 'src/index.js')
	],

	// Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].chunk.js'
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.[chunkhash].js',
			minChunks(module) {
				return module.context && module.context.indexOf('node_modules') >= 0
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true
			},
			output: {
				comments: false
			}
		}),
		new webpack.HashedModuleIdsPlugin(),
		// Ignore all other locals except [en]
		// (https://webpack.js.org/plugins/context-replacement-plugin/)
		new webpack.ContextReplacementPlugin(
			/moment[\/\\]locale$/, // eslint-disable-line no-useless-escape
			/de|en/
		),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'index.html'),
			path: path.join(__dirname, 'dist'),
			filename: 'index.html',
			minify: {
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true
			}
		}),
		new ExtractTextPlugin({
			filename: '[name].[contenthash].css',
			allChunks: true
		}),
		new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
			threshold: 10240,
			minRatio: 0.8
		})
	],
	stats: process.env.stats,
	devtool: 'cheap-module-source-map'
})
