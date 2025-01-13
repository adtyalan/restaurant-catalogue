const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const loader = require('sass-loader');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
    sw: path.resolve(__dirname, 'src/scripts/sw.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i, // Mencocokkan file SVG, PNG, JPEG, dan GIF
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Inline untuk file lebih kecil dari 8KB
              name: '[name].[hash].[ext]', // Format nama file
              outputPath: 'images', // Output folder untuk semua gambar
            },
          },
        ],
      }
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: 'images/illustrations/[name].[hash].[ext]',
      //         outputPath: 'assets/',
      //         publicPath: 'assets/',
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader', // Menggunakan url-loader
      //       options: {
      //         limit: 8192, // Batas ukuran file (8KB); file lebih kecil dari ini akan di-inline
      //         name: '[name].[hash].[ext]', // Format nama file
      //         outputPath: 'images', // Output folder untuk gambar
      //       },
      //     },
      //   ],
      // },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            // CopyWebpackPlugin mengabaikan berkas yang berada di dalam folder images
            ignore: ['**/**/heros/**'],
          },
        },
      ],
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 30,
          progressive: true,
        }),
      ],
    }),
    new BundleAnalyzerPlugin(),
  ],
};
