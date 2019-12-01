# 基于React构建的移动端构建
## create a project
```js
create-react-app projectName
cd projectName
yarn start
```
## install package
```js
npm install react-app-rewired customize-cra /1
            antd-mobile babel-plugin-import /2
            postcss-pxtorem /3
            node-sass /4
            react-router-dom /5
            --save
```
1. 在不使用eject的情况下实现自定义脚手架的配置
  * 在项目根目录，创建一个文件`config-overrides.js`
  ```js
    const {override, fixBabelImports, addPostcssPlugins, addWebpackAlias } = require('customize-cra');
    module.exports = override(
      // add webpack alias
      addWebpackAlias({
        ['@']: path.resolve(__dirname, 'src'),
        ['components']: path.resolve(__dirname, 'src/components')
      }),
      // babel-plugin-import
      fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css'
      }),
      // postcss-pxtorem
      addPostcssPlugins([require('postcss-pxtorem')({
        rootValue: 16,
        propList: ['*'],
        // propWhiteList: [],
        // selectorBlackList: ['weui-']
      })])
    )
  ```
  * 修改`package.json`
  ```js

    "scripts": {
      -   "start": "react-scripts start",
      +   "start": "react-app-rewired start",
      -   "build": "react-scripts build",
      +   "build": "react-app-rewired build",
      -   "test": "react-scripts test --env=jsdom",
      +   "test": "react-app-rewired test --env=jsdom",
      -   "eject": "react-scripts eject"
    }
  ```
2. 新建一个`rem.js`
```js
const baseSize = 32
function setRem() {
    const scale = document.documentElement.clientWidth / 750;
    document.documentElement.style.fontSize =
        baseSize * Math.min(scale, 2) + 'px'
}
setRem();
window.onresize = function() {
    setRem()
}

```
> 在`index.js`中引入