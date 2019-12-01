const path = require('path');
const {override, fixBabelImports, addPostcssPlugins, addWebpackAlias } = require('customize-cra');


module.exports = override(
  addWebpackAlias({
    ['@']: path.resolve(__dirname, 'src'),
    ['components']: path.resolve(__dirname, 'src/components')
  }),
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