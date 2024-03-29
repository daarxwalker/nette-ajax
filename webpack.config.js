const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	devtool: 'source-map',
	entry: ['./src/index.ts'],
	output: {
		filename: 'nette-ajax.min.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'netteAjax',
		libraryTarget: 'umd',
		libraryExport: 'default',
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
