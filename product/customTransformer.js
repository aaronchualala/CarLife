// For React Native version 0.59 or later
var upstreamTransformer = require('metro-react-native-babel-transformer');
var cssTransformer = require('react-native-css-transformer');

module.exports.transform = function ({src, filename, options}) {
  if (filename.endsWith('.css')) {
    return cssTransformer.transform({src, filename, options});
  } else {
    return upstreamTransformer.transform({src, filename, options});
  }
};
