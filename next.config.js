const path = require("path");

module.exports = {
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  // Increase the timeout for builds
  staticPageGenerationTimeout: 180,
  // Disable source maps in production to reduce memory usage
  productionBrowserSourceMaps: false,
};
