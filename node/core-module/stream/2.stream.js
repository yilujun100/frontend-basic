const fs = require('fs');
let ReadStream = require('./ReadStream');
let rs = new ReadStream('./1.txt', {
	flags: 'r',
	encoding: null,
	highWaterMark: 2,
	mode: 438,
	autoClose: true,
	start: 0,
	end: 4
});

rs.on('open', function (fd) {
	console.log('文件打开触发open事件', fd);
});

rs.on('data', function (data) {
	console.log(data);
});

rs.on('end', function () {
	console.log('文件读取完毕');
});

rs.on('close', function () {
	console.log('文件关闭');
});
