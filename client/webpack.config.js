const createExpoWebpackConfig = require('@expo/webpack-config');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');

// Get the path to .env file based on environment
const currentPath = path.join(__dirname);
const basePath = currentPath + '/.env';
const envPath = process.env.NODE_ENV === 'production' ? basePath + '.production' : basePath;

// Check if the file exists, otherwise fall back to .env
const finalPath = fs.existsSync(envPath) ? envPath : basePath;

// Set the path parameter in the dotenv config
const fileEnv = dotenv.config({ path: finalPath }).parsed;

// Create an object from the env variables
const envKeys = fileEnv
  ? Object.keys(fileEnv).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
      return prev;
    }, {})
  : {};

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfig(env, argv);

  // Add the DefinePlugin to inject environment variables
  config.plugins.push(new webpack.DefinePlugin(envKeys));

  // Ensure proper handling of process.env in the client code
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  );

  return config;
};
