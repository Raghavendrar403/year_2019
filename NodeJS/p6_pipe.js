var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res) {
	var readStream = fs.createReadStream(__dirname+'/p2.js');	
	readStream.pipe(res);
});

server.listen(3000,'127.0.0.1');
console.log("Listening on 127.0.0.1:3000");
