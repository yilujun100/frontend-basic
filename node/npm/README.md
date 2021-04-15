## 初始化包

package.json

```bash
npm init -y #默认直接生成
```

## 下载包

-   全局安装 在任意目录命令行下使用

```
npm i http-server -g
```

> 可以在命令中使用
> Users/yilujun/.nvm/versions/node/v12.19.0/bin/http-server -> /Users/yilujun/.nvm/versions/node/v12.19.0/lib/node_modules/http-server/bin/http-server
> /Users/yilujun/.nvm/versions/node/v12.19.0/bin/hs -> /Users/yilujun/.nvm/versions/node/v12.19.0/lib/node_modules/http-server/bin/http-server

我要写一个全局包, npm link 链接，创建快捷方式指向我的文件

```
"bin": {
    "use-npm": "./bin/www"
}
```

-   本地安装

```
npm install jquery --save / -S
npm install webpack --save-dev / -D
```

默认不给--save 表示安装到当前的 dependencies 表示的是上线和开发的时候都需要
devDependencies 开发依赖 上线的时候不需要

> 有一天把模块发布了，别人会安装你发布的模块，如果你的模块被别人安装，你的模块中的
> dependencies 会默认一起被下载，devDependencies 不会是不会下载的

sudo npm cache clean --force

常见的依赖项
dependencies
devDepencies
npm install --production 可以只安装 dependencies
peerDependencies 会提示你安装缺少的模块，默认要求带版本
bundleDependencies npm pack
optionalDependencies 如果找不到，不会影响 npm 的下载

## 版本问题

-   npm 使用了 1.0.0
    第一位如果变了，表示不兼容老代码，大规模的更新
    第二位表示增加了一些功能
    第三位表示小的补丁

> npm + git
> npm version major minor patch 更改版本并且可以同步 git tag(尽量不要手动去修改)

^2.0.0 只要不到 3 都可以 不能小于 2 2.0.1 2.2.2
~2.1.0 不超过第 2 位(1)

好处：用户不能直接使用
2.1.0-alpha.1
2.1.0-beta.1 测试 内部测试用的
2.1.0-rc.1

## 协议问题

https://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html

## scripts

我们可以通过 scripts 配置执行的脚本
1）执行命令 echo xxx 2) 执行 node_modules/.bin 下的文件

当我们执行 npm run 的时候，它会把当前目录 node_modules/.bin 也拷贝到当前系统的 path 中，所以 npm run 可以执行.bin 下的文件

## npx

可以直接执行 node_modules/.bin 文件，不需要再去配置 scripts
如果模块不存在可以安装，安装完使用后还会自动销毁，避免安装全局模块
npx create-react-app project-name

## 发布

发布包的时候 @vue/cli @vue/service
先切换到 npm 官方上
nrm nvm npm 可以切换源

```bash
npm install nrm -g
nrm use npm
```
