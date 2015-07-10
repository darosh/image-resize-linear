var fs = require('fs');
var mkdirp = require('mkdirp');
var load = require('./lib/load_image');
var ir = require('../index');
var PNG = require('pngjs').PNG;

describe('ImageResizeLinear module', function () {
	it('should down-size image', function (done) {
		load('./test/images/palette-b.png', function (image) {
			var to = {
				width: 300,
				height: 300,
				channels: image.channels
			};
			var png = new PNG(to);
			to.data = png.data;
			ir.linear(image, to);
			mkdirp('test/output', function () {
				png.pack().pipe(fs.createWriteStream('test/output/palette-b-300x300.png')).on('close', done);
			});
		});
	});

	it('should up-size image', function (done) {
		load('./test/images/palette-b.png', function (image) {
			var to = {
				width: 600,
				height: 600,
				channels: image.channels
			};
			var png = new PNG(to);
			to.data = png.data;
			ir.linear(image, to);
			mkdirp('test/output', function () {
				png.pack().pipe(fs.createWriteStream('test/output/palette-b-600x600.png')).on('close', done);
			});
		});
	});
});
