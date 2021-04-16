class EventEmitter {
	constructor() {
		this._events = Object.create(null); // _events属性用来存储每个事件 event[fn1, fn2],每个event可以通过on来监听事件，每个事件可以注册多个监听器
	}

	// 给一个事件注册一个监听器
	on(eventName, callback) {
		if (this._events[eventName]) {
			this._events[eventName].push(callback);
		} else {
			this._events[eventName] = [callback];
		}
	}

	// emit: 通过事件名找到对应的监听器数组，然后遍历执行即可
	emit(eventName, ...args) {
		if (this._events[eventName]) {
			this._events[eventName].forEach(fn => fn(...args));
		}
	}

	// off: 根据事件名从events中找到对应的监听器，然后删除掉
	off(eventName, callback) {
		if (!this._events[eventName]) return;
		this._events[eventName] = this._events[eventName].filter(
			fn => fn !== callback && fn.origin !== callback
		);
	}

	// once: 只绑定一次，在执行监听器的时候就把当前监听器移除掉
	once(eventName, callback) {
		const wrapFn = (...args) => {
			callback(...args);
			// 当绑定后将自己移除掉
			this.off(eventName, wrapFn);
		};
		wrapFn.origin = callback;
		this.on(eventName, wrapFn);
	}
}

module.exports = EventEmitter;
