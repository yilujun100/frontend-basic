// 浏览器 window对象
// 浏览器中无法直接访问global对象,所以需要window来代理

// 在node中可以直接访问global

// 默认声明的属性不放在global上
// node 的特点： 每个文件都是一个模块，模块外面包了匿名函数
// let a = 1;
// console.log(global.a);
// console.log(this === module.exports);

/* (function () {
	console.log(Object.keys(this));
})(); */

// global中的属性叫全局属性 + module, exports, require, __dirname, __filename叫全局对象

// process 进程（计算机分配任务和调度任务的最小单位）开启很多个线程
// Buffer 缓存区 node可以运行在服务器上并拥有操作文件的能力 读取文件 内存中的数据都是二进制（二进制有一个缺陷就是很长，1个字节有8个位）数据 16进制
// clearInterval setInterval
// clearTimeout setTimeout
// clearImmediate setImmediate 宏任务

// process 进程
// 1)platform 平台
// console.log(process.platform); // mac -> darwin windows -> win32
// 2)argv 代表用户传递的参数 默认前两个参数没有实际意义 第一个参数：node的可执行文件 第二个参数：当前执行的是哪个文件
// 执行node node + 文件名执行
// 只能通过 命令 + 文件名 后面是参数 process.argv.slice(2)
// console.log(process.argv.slice(2)); // 我们可以搜集用户传递的参数
// '--port', '3000', '--config', 'xxx' => { port: 3000, config: xxx }
let config = process.argv.slice(2).reduce((acc, cur, index, arr) => {
	if (cur.includes('--')) {
		acc[cur.slice('2')] = arr[index + 1];
	}
	return acc;
}, {});
// console.log('config: ', config);

// commander 命令行的管家 帮你提供--help,由于是第三方模块，所以必须先安装
const program = require('commander');
const chalk = require('chalk');
// 解析用户的参数 默认提供--help
program // 配置命令 我输入命令后 要执行一些内容
	.command('create')
	.alias('c')
	.description('create project')
	.action(() => {
		console.log('create project');
	});
program // 配置属性 给代码传递参数
	.option('-p, --port <val>', 'set port')
	.version('1.0.0');
program
	.on('--help', () => {
		console.log('\r\nExamples');
		console.log('  node 1.argv.js --help');
		console.log('  node 1.argv.js create ' + chalk.green('project'));
	})
	.parse(process.argv);
// chalk 粉笔

// 3)chdir cwd() current working directory
// 4)env 环境变量
// 5)nextTick node中的微任务
