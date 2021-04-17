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

// 3) 扩展buffer的方法
