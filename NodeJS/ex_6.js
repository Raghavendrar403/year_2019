var events = require('events');
var eventEmitter = new events.EventEmitter();

var listener1 = function listener1() {
	console.log('LISTENER 1');
}

var listener2 = function listener2() {
	console.log('LISTENER 2');
}

eventEmitter.addListener('connection',listener1);
eventEmitter.addListener('connection',listener2);

var eventListeners = events.EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners+' Listener(s) listening to connection event');

eventEmitter.emit('connection');

eventEmitter.removeListener('connection',listener1);

console.log('Listener 1 gone');

eventListeners = events.EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners+' Listener(s) listening to connection event');

eventEmitter.emit('connection');

console.log('Program Ends here');
