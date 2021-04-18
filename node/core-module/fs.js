// file system 可以在服务端读取文件和数据 方法是同步 + 异步共存
// 同步方法易使用（刚开始运行）
// 异步方法不会阻塞主线程（运行起来后使用异步） 回调函数

let fs = require('fs');
// 读取文件 文件不存在会报错
// 写入文件 文件不存在会创建文件
/* fs.readFile('./1.txt', function (err, data) {
	if (err) {
		console.log(err);
	}
	fs.writeFile('./1.copy.txt', data, function () {});
}); */
// 64k以下的文件可以使用上面这种方式

// 不适合大文件来使用，否则可能会导致内存的浪费
// 我可以读取一点 写入一点
// 手动按照字节来读取 fs.open fs.read fs.write fs.close
// r 读取
// w 写入
// r+ 在读的基础上可以写，但是文件不存在会报错
// w+ 在写的基础上读取，如果文件不存在会创建
let buffer = Buffer.alloc(3);
fs.open('./1.txt', 'r', (err, rfd) => {
	// file descriptor
	// 读取文件 fd代表读取的文件 buffer:我要把读取的内容写到那个buffer中
	// 0,3 从buffer的第0个位置写入 写入3个
	// 0 从文件的哪个位置开始读取
	fs.open('./1.copy.txt', 'w', (err, wfd) => {
		fs.read(rfd, buffer, 0, 3, 0, function (err, bytesRead) {
			fs.write(wfd, buffer, 0, 3, 0, function (err) {});
		});
	});
});

// 两个耦合性比较高的代码怎么拆分，可以使用发布订阅 => 流
