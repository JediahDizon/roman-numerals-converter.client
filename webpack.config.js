const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
	mode: "development",
	performance: {
		maxAssetSize: 10000000,
		maxEntrypointSize: 15000000 // This will tell Webpack to give us a warning when the asset size is 10MB.
	},
	entry: {
		bundle: ["babel-polyfill", "./src/index.js"]
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].[hash].js"
	},
	devServer: {
		historyApiFallback: true,
		contentBase: "./"
	},
	module: {
		rules: [
			/* JS */
			{
				test: /\.jsx?$/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true
					}
				},
				exclude: /node_modules/ // Libraries in the Node Modules folder are already minified and are in ES5 format
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: { minimize: true }
					}
				]
			},
			/* CSS */
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			/* TTF Font */
			{
				test: /\.ttf$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						mimetype: "application/octet-stream"
					}
				}
			},
			/* WOFF Font */
			{
				test: /\.woff$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						mimetype: "application/font-woff",
					}
				},
			},
			/* WOFF2 Font */
			{
				test: /\.woff2$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						mimetype: "application/font-woff",
					}
				}
			},
			/* EOT Font */
			{
				test: /\.eot$/,
				use: "file-loader",
			},
			/* SVG */
			{
				test: /\.svg$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						mimetype: "image/svg+xml",
					}
				}
			},
			/* Common Image Formats */
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
				use: "url-loader",
			}
		]
	},
	plugins: [
		// Automatically import the <script /> tags to target HTML
		new HtmlWebpackPlugin({
			template: "src/index.html"
		}),
		// Automatically import the stylesheets to target HTML
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	],
	optimization: {
		splitChunks: { // CommonsChunkPlugin()
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	}
};
