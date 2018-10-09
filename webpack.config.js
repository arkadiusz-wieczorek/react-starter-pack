const path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
	/* global module, __dirname */
	mode: 'development',
	devtool: argv.mode !== 'production' ? 'source-map' : false,
	entry: './src/',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 8080,
		compress: true,
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: [
					{
						loader: 'style-loader', // creates style nodes from JS strings
					},
					{
						loader: 'css-loader', // translates CSS into CommonJS
						options: {
							sourceMap: argv.mode !== 'production',
						},
					},
					{
						loader: 'sass-loader', // compiles Sass to CSS
						options: {
							sourceMap: argv.mode !== 'production',
						},
					},
				],
			},
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/react', '@babel/preset-env'],
					},
				},
				include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/mop')],
			},
			{
				test: /\.woff2/,
				loader: 'file-loader?name=fonts/[name]-[hash].[ext]',
			},
			{
				test: /\.(png|jpg|gif|svg|mp3|ico|mp4)$/,
				include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/mop')],
				loader: 'file-loader?name=images/[name].[ext]',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
	],
});
