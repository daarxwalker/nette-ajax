const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	entry: ['./src/index.ts'],
	output: {
		filename: './dist/nette-ajax.min.js',
		path: path.resolve(__dirname),
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	resolve: { extensions: ['.js', '.ts', '.json'] },
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['./dist/*'],
		}),
	],
}
