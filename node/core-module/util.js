// ncp
let ncp = require('ncp');
const path = require('path');
const { inherits, inspect } = require('util');
// cp -r
const promisify = fn => (...args) => {
	return new Promise((resolve, reject) => {
		fn(...args, function (err) {
			// 只针对node,因为node是这种error-first的形式
			if (err) reject(err);
			resolve();
		});
	});
};
ncp = promisify(ncp);
(async () => {
	await ncp(path.resolve(__dirname, 'note.md'), path.resolve(__dirname, 'note1.md'));
	console.log('拷贝成功');
})();
/* ncp(path.resolve(__dirname, 'note.md'), path.resolve(__dirname, 'note1.md'), err => {
	console.log(err);
}); */

// inherits node内部不是用es6来写的 实现类的继承
function Parent() {}
function Child() {
	Parent.call(this);
}
// 只继承公共方法
Child.prototype.__proto__ = Parent.prototype;
Reflect.setPrototypeOf(Child.prototype, Parent.prototype);
Child.prototype = Object.create(Parent.prototype);

inherits(Child, Parent); // 继承公共属性

console.log(inspect(Array.prototype, { showHidden: true })); // 可以显示隐藏属性
console.log();
