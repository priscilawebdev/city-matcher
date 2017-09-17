/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (options) => {
	if (options.stats) {
		options.plugins.push(
			new BundleAnalyzerPlugin()
		)
	}

	return {
		entry: options.entry,
		output: Object.assign({ // Compile into dist
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/'
		}, options.output), // Merge with env dependent settings
		resolve: {
			modules: [
				path.resolve(__dirname, 'node_modules')
			]
		},
		stats: {
			hash: false,
			colors: true,
			chunks: false,
			chunkModules: false,
			version: false,
			reasons: true
		},
		node: {
			console: true,
			fs: 'empty',
			net: 'empty',
			tls: 'empty'
		},
		module: {
			rules: [{
				test: /\.js$/, // Transform all .js files required somewhere with Babel
				loader: 'babel-loader',
				exclude: /node_modules/
			}, {
				test: /\.css$/,
				include: /node_modules/,
				loaders: ['style-loader', 'css-loader']
			}, {
				test: /\.sass$/,
				use: [{
					loader: 'style-loader' // creates style nodes from JS strings
				}, {
					loader: 'css-loader',
					options: { url: true }
				}, {
					loader: 'sass-loader', // compiles Sass to CSS
					options: {
						sourceMap: true
					}
				}]
			}, {
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'file-loader'
			}, {
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[sha512:hash:base64:7].[ext]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							svgo: {
								plugins: [
									{ removeTitle: true },
									{ removeMetadata: true },
									{ removeUselessStrokeAndFill: true },
									{ cleanupIDs: true },
									{ removeUnknownsAndDefaults: true },
									{ removeEmptyText: true },
									{ removeHiddenElems: true },
									{ removeEmptyAttrs: true },
									{ removeComments: true }
								]
							}
						}
					}
				]
			}, {
				test: /\.html$/,
				loader: 'html-loader'
			}, {
				test: /\.json$/,
				loader: 'json-loader'
			}, {
				test: /\.(mp4|webm)$/,
				loader: 'url-loader',
				query: {
					limit: 10000
				}
			}]
		},
		plugins: options.plugins,
		devtool: options.devtool,
		target: 'web', // Make web variables accessible to webpack, e.g. window,
		performance: options.performance || {}
	}
}
