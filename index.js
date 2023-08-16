// 导入所需的模块和库
const fs = require('fs');               // 文件操作模块
const prettier = require("prettier");   // Prettier 格式化工具
const chokidar = require('chokidar');   // 文件监视工具
const _ = require('lodash');            // 工具库

// 用于缓存文件内容和格式化状态的对象
const FileCache = {};

/**
 * VuePrettierPlugin 插件函数，用于在 webpack 编译过程中实现自动格式化 Vue 文件。
 * @param {Object} option - Prettier 格式化选项
 * @param {Object} watchOptions - 监视选项
 * @param {Array|string} watchDirs - 需要监视的目录路径
 * @returns {Object} 插件配置对象
 */
function VuePrettierPlugin(option, watchDirs = 'src/', watchOptions = {}) {
    let { watchDirs = [], ignoreDirs = [] } = watchOptions;

    // 创建文件监视器实例
    let FSWatcher;
    
    return {
        apply: (compiler) => {
            // 在编译前挂载钩子函数
            compiler.hooks.beforeCompile.tapAsync('VuePrettierPlugin', (params, callback) => {
                // 初始化文件监视器
                FSWatcher = chokidar
                    .watch(watchDirs, {
                        ignored: ignoreDirs,
                        ignoreInitial: true
                    })
                    .on('change', _.debounce((path) => {
                        FileCache[path] = FileCache[path] || {};
                        let fileStr = fs.readFileSync(path, 'utf8');
                        
                        // 如果文件内容相同或正在格式化中，直接返回
                        if (fileStr == FileCache[path].file || FileCache[path].parsing) return;
                        
                        // 标记文件正在格式化
                        FileCache[path].parsing = true;

                        // 使用 Prettier 进行格式化
                        const prettierSource = prettier.format(fileStr, {
                            filepath: path,
                            ...option
                        });

                        // 将格式化后的内容写入文件
                        fs.writeFile(path, prettierSource, 'utf8', (err) => {
                            if (err) {
                                console.error(err);
                            }
                            // 标记格式化完成，并更新缓存
                            FileCache[path].parsing = false;
                            FileCache[path].file = prettierSource;
                        });
                    }, 200));

                callback(); // 执行 webpack 的回调函数
            });

            // 在编译完成后挂载钩子函数
            compiler.hooks.done.tap('VuePrettierPlugin', () => {
                // 关闭文件监视器
                if (FSWatcher) {
                    FSWatcher.close();
                }
            });
        }
    };
}

module.exports = VuePrettierPlugin; // 导出插件函数
