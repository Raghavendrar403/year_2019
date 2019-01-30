var sp = require('serialport');
portName = '/dev/ttyUSB0';

var myPort = new sp(portName, {
	baudRate: 9600,
	dataBits: 8,
	});

myPort.on('open', function() {
	
	var buf = ["R".charCodeAt()];
	buf.push("T".charCodeAt());
	buf.push("5".charCodeAt());
	//myPort.write(buf, function(err) {
	//	if(err) {
	//		console.log("ERRO: "+err);
	//	}
	//});
	//buf = new Array();
	buf.push("1".charCodeAt());
	buf.push("1".charCodeAt());
	buf.push("S".charCodeAt());
	buf.push("E".charCodeAt());
	buf.push("T".charCodeAt());
	for(var i = 0; i<59; i++) {
		buf.push("O".charCodeAt());
	}

	buf.push("o".charCodeAt());
	buf.push("{".charCodeAt());
	buf.push(1);
	buf.push(0);
	buf.push(1);
	buf.push("}".charCodeAt());
	buf.push("R".charCodeAt());
	buf.push("S".charCodeAt());
	buf.push("T".charCodeAt());
	myPort.write(buf,function(err) {
		if(err) {
			console.log("ERROR: "+err);
		}

		else {
			console.log("Write successful");
		}
	});
});

myPort.on('open',function() {
	myPort.on('data',function(data) {
		console.log("DATA: ",data.toString());
	});
});
