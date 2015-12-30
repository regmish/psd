var util = require('util');
var PSD = require('psd');
var fs = require('fs');


module.exports = function tree(file) {
	var psd = PSD.fromFile(file);
	psd.parse();

	console.log(util.inspect(psd.tree().export(), {
		depth: null
	}));
	//fs.closeSync(fs.openSync('./output/test.json', 'w'));
	fs.writeFile('./output/test.json', util.inspect(psd.tree().export(), {
		depth: null
	}), function(err) {
		if (err) return console.log(err);
		console.log('Created > test.json');
	});
}