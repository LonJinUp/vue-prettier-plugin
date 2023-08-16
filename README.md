
# VuePrettierPlugin

VuePrettierPlugin 是一个用于在 `Vue2` 项目中自动格式化代码的 `Webpack` 插件。该插件不需要依赖`vscode`中的`prettier`插件，添加该插件后即可在运行时根据配置项格式化文件。

## 安装

使用 npm 进行安装：

```bash
npm install vue-prettier-plugin --save-dev
```

## 使用

在你的 `vue.config.js` 文件中引入和使用插件：

```javascript
const VuePrettierPlugin = require('vue-prettier-plugin');

module.exports = {
  // ...其他配置
  configureWebpack: {
    plugins: [
      new VuePrettierPlugin(
        {
          // Prettier 格式化选项
          printWidth: 100,
          tabWidth: 4,
          // ...其他选项
        },
        'src/',//格式化文件路径，默认 src/
      ),
    ],
  },
};
```

## 选项

- `option`（Object）：Prettier 格式化选项，具体配置参考 [Prettier 文档](https://prettier.io/docs/en/options.html)。
- `watchOptions`（Object）：监视选项，用于指定需要监视的目录和文件。
- `watchDirs`（Array|string，默认为 `'src/'`）：需要监视的目录路径，可以是字符串或字符串数组。

## 注意事项

- 该插件会在编译过程中自动格式化指定目录下的 Vue 文件。
- 请确保已经安装了 `vue-loader` 和 `vue-template-compiler`。
- 为了防止不必要的错误，建议在开发环境中使用该插件。
- 如果觉得有用，帮忙点个`star`! github地址：[vue-prettier-plugin](https://github.com/LonJinUp/vue-prettier-plugin)



# VuePrettierPlugin

VuePrettierPlugin is a Webpack plugin designed to automatically format code in `Vue2` projects. This plugin does not require the `prettier` extension found in `vscode`. Once added, it enables runtime code formatting based on the configuration settings.

## Installation

Install using npm:

```bash
npm install vue-prettier-plugin --save-dev
```

## Usage

Import and use the plugin in your `vue.config.js` file:

```javascript
const VuePrettierPlugin = require('vue-prettier-plugin');

module.exports = {
  // ...other configurations
  configureWebpack: {
    plugins: [
      new VuePrettierPlugin(
        {
          // Prettier formatting options
          printWidth: 100,
          tabWidth: 4,
          // ...other options
        },
        'src/',//Format file path, default src/
      ),
    ],
  },
};
```

## Options

- `option` (Object): Prettier formatting options, refer to the [Prettier documentation](https://prettier.io/docs/en/options.html) for specific configuration.
- `watchOptions` (Object): Watch options for specifying directories and files to monitor.
- `watchDirs` (Array|string, default is `'src/'`): Directories to be watched, can be a string or an array of strings.

## Notes

- This plugin automatically formats Vue files in the specified directories during the compilation process.
- Make sure you have `vue-loader` and `vue-template-compiler` installed.
- It's recommended to use this plugin in development environment to avoid unnecessary errors.
- If you find it helpful, please consider giving it a `star`! GitHub repository link: [vue-prettier-plugin](https://github.com/LonJinUp/vue-prettier-plugin)
