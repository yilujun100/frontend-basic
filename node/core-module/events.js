// 发布订阅模块
const EventEmitter = require('./myEvents');

const myEmitter = new EventEmitter();
/* myEmitter.on('event', () => {
	// on 注册事件监听器
	console.log('触发事件');
});
myEmitter.emit('event'); // emit 触发事件，从而执行监听器 */

// 参数传递：调用emit方法时，可以传入任意数量的参数
/* myEmitter.on('event', function (a, b) {
	console.log(a, b);
});
myEmitter.emit('event', 'a', 'b'); */

// off: 移除监听器
/* const fn = () => {
	console.log('触发事件');
};
myEmitter.on('event', fn);
myEmitter.off('event', fn);
myEmitter.emit('event'); */

// 不会再打印 '触发事件'

// once
// once方法是将事件订阅“一次”，当这个事件触发过就不会再被触发。
/* const fn = () => {
	console.log('触发事件');
};
myEmitter.once('event', fn);
myEmitter.emit('event');
myEmitter.emit('event'); */

// 虽然触发了两次event,但只打印了一次event

const fn = () => {
	console.log('触发事件');
};

myEmitter.once('event', fn);
myEmitter.off('event', fn);
myEmitter.emit('event');
