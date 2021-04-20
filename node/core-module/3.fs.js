// fs 操作文件
// 删除文件 重命名
const fs = require('fs');
const path = require('path');

fs.rename('./1.copy.txt', './1.c.txt', function () {});
fs.unlink('./1.c.txt', function () {});

// 文件的操作
// fs.readFile fs.existSync fs.access
// fs.writeFile fs.copyFile
// fs.rename fs.unlink

// 文件夹的操作
// 创建目录 删除目录 读取目录

/* function mkdir(paths, callback) {
	paths = paths.split('/');
	let index = 1;
	function next() {
		if (index === paths.length + 1) return callback(); // 说明整个目录全部创建完毕
		let dirPath = paths.slice(0, index++).join('/');
		fs.access(dirPath, function (err) {
			if (err) {
				fs.mkdir(dirPath, next);
			} else {
				next();
			}
		});
	}
	next();
}
mkdir('a/b/c/d/e/f', function () {
	console.log('创建完成');
}); */

// fs.rmdir fs.readdir fs.state isFile isDirectory

/* fs.readdir('a', function (err, dirs) {
	dirs = dirs.map(dir => path.join('a', dir));
	console.log(dirs);
	dirs.forEach(dir => {
		fs.stat(dir, function (err, statObj) {
			if (statObj.isFile()) {
				fs.unlink(dir, () => {});
			} else {
				fs.rmdir(dir, () => {});
			}
		});
	});
}); */

// 递归删除目录（异步实现）
function preDeep(dir, callback) {
	fs.stat(dir, function (err, statObj) {
		if (statObj.isFile()) {
			// 是文件直接删除即可
			fs.unlink(dir, callback);
		} else {
			fs.readdir(dir, function (err, dirs) {
				let index = 0;
				dirs = dirs.map(item => path.join(dir, item));
				function next() {
					if (index === dirs.length) return fs.rmdir(dir, callback);
					let currentPath = dirs[index++];
					preDeep(currentPath, next);
				}
				next();
			});
		}
	});
}
preDeep('a', function () {
	console.log('删除成功');
});
