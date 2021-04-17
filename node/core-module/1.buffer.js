let fs = require('fs');
let path = require('path');

let r = fs.readFileSync(path.resolve(__dirname, '1.txt'));
console.log(r); // <Buffer e4 bd a0 e5 a5 bd>
// 默认文件读取操作，读取出来的都是buffer
// 内存表示方式就是buffer
// 进制转化问题 0.1 + 0.2 != 0.3 我们需要将值存储到内存中，保持的时候存储的是二进制

// 进制转换
// 将10进制转化为其他进制 255 0xff 0b 0o
console.log((100).toString(16));
console.log((0xff).toString(2));

// 将任意进制转化为10进制
console.log(parseInt('0xff', 16));

// base64 二进制的值不能超过64 (核心就是进制转换)
// base64 可以反解 加密 加密后可以特殊的人解密

// 在浏览器header中，任意的url中都可以采用base64,前端实现文件预览 fileReader
// 转码后的结果比原来的内容大

// 如果是一个汉字
console.log(Buffer.from('珠')); // e7 8f a0
console.log((0xe7).toString(2));
console.log((0x8f).toString(2));
console.log((0xa0).toString(2));
// 11100111 10001111 10100000   3*8 -> 6*4
// 111001 111000 111110 100000

// base64 转换后去特定的字符串取值
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
str += '0123456789+/';
let result = str[0b111001] + str[0b111000] + str[0b111110] + str[0b100000];
console.log(result);

// base64就是编码转换 不需要发送http请求，大小会比以前大
console.log(Buffer.from('珠').toString('base64'));
