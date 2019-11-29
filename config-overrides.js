const {override, fixBabelImports, addPostcssPlugins } = require('customize-cra');

module.exports = override(
  // babel-plugin-import
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addPostcssPlugins([require('postcss-pxtorem')({
    rootValue: 16,
    propList: ['*'],
    // propWhiteList: [],
    // selectorBlackList: ['weui-']
  })])
)