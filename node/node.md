## Node基础篇

### Node是什么

* 用于编写服务器端应用

* JavaScript核心语法

* 只是操作的对象不同

  | 前端 | DOM                  | 文档对象   |
  | ---- | -------------------- | ---------- |
  |      | BOM/DOM              | 浏览器对象 |
  |      | XMLHttpRequest/fetch | 网络通讯   |
  | 后端 | os                   | 操作系统   |
  |      | process              | 进程       |
  |      | fs                   | 文件系统   |
  |      | net                  | 网络通讯   |

### API哪里找

英文 https://nodejs.org/dist/latest-v12.x/docs/api/

中文 http://nodejs.cn/api/

## 运行/调试/模块 - 如何搭建万里长城

### Helloworld

```javascript
console.log('hello world')
```

### bash运行

```javascript
node helloworld/index.js
# 或
node helloworld
```

### Nodemon自动重启

监视代码修改，自动重启

```javascript
npm i -g nodemon
nodemon helloworld
```

### Vscode调试debug

### 单元测试Jest

安装jest库

```javascript
npm install -g jest
```

在\_\_tests__文件夹中创建index.spec.ts

```javascript
test('hello world', () => {
   require('../index')
});
```

运行

```javascript
jest helloworld
```



### 测试代码生成工具

> * 掌握fs中的同步方法
> * path包

### 生成测试文件名

```javascript
test('测试文件名称', () => {
    const src = new (require('../index'))()
    const ret = src.getTestFileName('/abc/class.js')
    console.log('getSourceName', ret)
    expect(ret)
        .toBe('/abc/__test__/class.spec.js')
})
```

```javascript
const path = require('path')
module.exports = class TestNow {
    /**
     * 生成测试文件名
     * @param {*} filename 代码文件名
     */
    getTestFileName(filename) {
        const dirName = path.dirname(filename)
        const baseName = path.basename(filename)
        const extName = path.extname(filename)
        const testName = baseName.replace(extName, `.spec${extName}`)
        return path.format({
            root: dirName + '/__test__/',
            base: testName
        })
    }
}
```

