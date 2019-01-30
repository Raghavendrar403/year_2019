var events = require('events');
var util = require('util');

var Person = function(name) {
	this.name = name;
}

util.inherits(Person,events.EventEmitter);

var james = new Person('James');
var xyz = new Person('xyz');
var ryu = new Person('ryu');

var people = [james,xyz,ryu];

people.forEach(function(item) {
	item.on('speak',function(msg) {
		console.log(item.name+' said: '+msg);	
	});
});

james.emit('speak','Hello my dudes');
