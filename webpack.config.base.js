/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path')

const rules = [
	{
		test: /\.js$/, // Transform all .js files required somewhere with Babel
		loader: 'babel-loader',
		exclude: /node_modules/
	},
	{
		test: /\.css$/,
		include: /node_modules/,
		loaders: ['style-loader', 'css-loader']
	},
	{
		test: /\.(eot|ttf|woff|woff2)$/,
		loader: 'file-loader'
	},
	{
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
	}
]

module.exports = (options) => {
	rules.push(options.module)
	return ({
		entry: options.entry,
		output: Object.assign({
			path: path.join(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
			publicPath: '/'
		}, options.output), // Merge with env dependent settings
		resolve: {
			modules: ['src', 'node_modules'],
			extensions: ['.js', '.jsx']
		},
		node: {
			fs: 'empty',
			net: 'empty',
			tls: 'empty'
		},
		module: { rules },
		plugins: options.plugins,
		devtool: options.devtool,
		target: 'web' // Make web variables accessible to webpack, e.g. window
	})
}
