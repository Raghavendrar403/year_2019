var events = require('events');

var eventEmitter = new events.EventEmitter();

var connectionHandler = function connected() {
	console.log('connections successful');
	eventEmitter.emit('data_recieved');
}

eventEmitter.on('connection', connectionHandler);

eventEmitter.on('data_recieved',function() {
	console.log('data recieved successfully');
});

eventEmitter.emit('connection');

