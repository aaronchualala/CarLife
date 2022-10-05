const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('./customTransformer.js'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'css'),
      sourceExts: [...sourceExts, 'css', 'jsx', 'js', 'ts', 'tsx'],
    },
  };
})();