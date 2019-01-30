var serialport = require('serialport');
var portName = '/dev/ttyUSB0';

var myPort = new serialport(portName, 9600);

myPort.on('open',function() {
	//var x = ["R".charCodeAt(0), "T".charCodeAt(0), "5".charCodeAt(0)];
	////for(var i = 0
	//x.push(1,1,'S'.charCodeAt(),'E'.charCodeAt(),'T'.charCodeAt());
	//x.push('O'.charCodeAt());
//var x = [82,84,53,1,1,83,69,84,79,'P'.charCodeAt(),79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,111,123,2,0,255,125,82,83,84]
var x = [82,84,53,1,1,83,69,84,79,'P'.charCodeAt(),79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,111,123,2,0,255,125,'w'.charCodeAt(),0,0,0,2,82,83,84]
	//console.log('X; ',x);
	for(var i = 0; i<x.length;i++) {
		console.log(i,':',x[i]);
	}
	myPort.write(x,function(err) {
		if(err) {
			console.log("Error write");
		}

		else {
			console.log("Write successful");
		}
	});
});

//myPort.on('open', function() {
//	myPort.on('data', function(data) {
//		console.log('Reading');
//		var res = data.toString();
//		console.log(res);
//	});
//});
