// 把二进制表现成了10进制 可以和字符串进行转化

// 1) buffer的声明方式 (内存) 数组可以扩容
// 固定大小
// let buf = Buffer.alloc(5);
let buf = Buffer.allocUnsafe(5);
buf.fill(0);
console.log(buf);

buf = Buffer.from([100, 120, 130]);
console.log(buf);

buf = Buffer.from('珠峰');
console.log(buf);

// 2) buffer常见方法
// 2.1) slice
// 和数组类似
let arr = [[1, 2, 3], 3, 4, 5];
let newArr = arr.slice(0); // 浅拷贝
newArr[0][1] = 100;
console.log(arr);

let buffer = Buffer.from('珠峰'); // buffer存放的都是内存地址，如果截取某一段，改变的时候也是更改了这个内存地址
let newBuffer = buffer.slice(0);
newBuffer[0] = 100;
console.log(buffer);
// 2.2) 判断buffer类型
console.log(Buffer.isBuffer(buffer));

// 2.3) buffer不能扩展大小
// copy 拷贝
Buffer.prototype.copy = function (
	targetBuffer,
	targetStart,
	sourceStart = 0,
	sourceEnd = this.length
) {
	for (let i = 0; i < sourceEnd - sourceStart; i++) {
		// 将每次循环出的结果拷贝到目标的buffer上即可
		targetBuffer[targetStart + i] = this[sourceStart + i];
	}
};
let buff = Buffer.alloc(6);
let buffer1 = Buffer.from('珠');
let buffer2 = Buffer.from('峰');
// 当前buffer.copy(目标buffer, 目标的开始位置, 源的开始, 源的结束)
buffer1.copy(buff, 0, 0, 3);
buffer2.copy(buff, 3, 0, 3);
console.log(buff.toString());

// 2.4) concat 拼接
let newBuffer1 = Buffer.concat([buffer1, buffer2]);
console.log(newBuffer1);

// 3) 扩展buffer的方法
// split方法
let buffer = Buffer.from(`珠峰珠峰珠峰
珠峰珠峰珠峰
珠峰珠峰珠峰`);

Buffer.prototype.split = function (sep) {
	let len = Buffer.from(sep).length; // 分隔符的长度
	let offset = 0;
	let current;
	let result = [];
	while ((current = this.indexOf(sep, offset)) !== -1) {
		result.push(this.slice(offset, current));
		offset = current + len;
	}
	result.push(this.slice(offset));
	return result;
};
console.log(buffer.split('\n'));
