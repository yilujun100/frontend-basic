// chdir cwd() current working directory
const path = require('path');
console.log(path.resolve()); // 解析出一个绝对路径
console.log(process.cwd()); // 在哪里执行这个文件，目录就是哪里 代表的就是执行的文件的目录
// env 环境变量
// console.log(process.env); // 可以根据环境变量的不同 执行不同的结果
// 开发的时候 localhost / www.xxx.cn
// 临时的变量 export / set => cross-env
let url = '';
if (process.env.NODE_ENV === 'development') {
	url = 'localhost';
} else {
	url = 'www';
}
console.log(url);
// nextTick node 中的微任务
Promise.resolve().then(data => {
	console.log('then');
});
process.nextTick(() => {
	console.log('nextTick');
});

// node 中的EventLoop
// 受node的性能影响，不一定谁在前 根据调用的上下文
/* setTimeout(() => {
	console.log('timeout');
}, 0);
setImmediate(() => {
	console.log('setImmediate');
}); */

/* let fs = require('fs');
fs.readFile('./.gitignore', function () {
	setTimeout(() => {
		console.log('timeout');
	}, 0);
	setImmediate(() => {
		console.log('setImmediate');
	});
}); */

// setImmediate 如果在i/o之后，会立即执行
// ! 注意：nextTick不能写递归

setTimeout(() => {
	console.log('timer1');
	Promise.resolve().then(() => {
		console.log('then1');
	});
});
Promise.resolve().then(() => {
	console.log('then2');
	setTimeout(() => {
		console.log('timer2');
	});
});
// then2 -> timer1 -> then1 -> timer2
