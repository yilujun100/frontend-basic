const fs = require('fs');
const SIZE = 5;
let buffer = Buffer.alloc(SIZE);

fs.open('./1.txt', 'r', function (err, rfd) {
	fs.open('./1.copy.txt', 'w', function (err, wfd) {
		let readOffset = 0;
		let writeOffset = 0;
		function next() {
			fs.read(rfd, buffer, 0, SIZE, readOffset, function (err, bytesRead) {
				if (bytesRead === 0) {
					fs.close(wfd, () => {});
					fs.close(rfd, () => {});
					return;
				}
				fs.write(wfd, buffer, 0, bytesRead, writeOffset, function () {
					readOffset += bytesRead;
					writeOffset += bytesRead;
					next();
				});
			});
		}
		next();
	});
});
