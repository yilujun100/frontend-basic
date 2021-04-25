// 可写流的使用
const fs = require('fs');

// 使用方式 1：
// const ws = fs.createWriteStream('./1.txt');

// 使用方式 2:
const ws = fs.createWriteStream('./1.txt', {
	flags: 'w',
	encoding: 'utf8',
	autoClose: true,
	highWaterMark: 2
});

// 写入文件
const flag = ws.write('2');
// 这里有一个返回值，代表是否已经达到最大缓存。当我们同步连续调用多次write()时，并不是每次调用都立即写入文件，
// 而是同一时间只能执行一次写入操作，所以剩下的会被写入到缓存中，等上一次写入完毕后再从缓存中依次取出执行。
// 所以，这时就会有一个最大的缓存大小，默认为64kb。而这里的返回值则代表，是否还可以继续写入，也就是：是否达到了最大缓存。
// true代表可以继续写入。

ws.on('drain', () => console.log('drain'));
