const fs = require('fs');

// const rs = fs.createReadStream('./w-test.js');
const rs = fs.createReadStream('./w-test.js', {
	flags: 'r', // 文件系统表示，这里是指以可读的形式操作文件
	encoding: null, // 编码方式
	autoClose: false, // 读取完毕时是否自动触发 close 事件
	start: 0, // 开始读取的位置
	end: 2, // 结束读取的位置
	highWaterMark: 2 // 每次读取的内容大小
});
// start 跟 end都是包含的，即[start, end]

// 当on('data')时，会自动读取文件数据，每次默认读取64kb的内容，也可以通过highWaterMark参数来动态改变每次内容流程的阈值
rs.on('data', chunk => {
	console.log(chunk);
});

// 文件读取完毕会自动触发close事件
rs.on('close', () => {
	console.log('close');
});
