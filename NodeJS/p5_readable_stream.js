var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname+'/p1.js','utf-8');

myReadStream.on('data',function(data) {
	console.log('new chunk recieved');
	console.log(data);
});
