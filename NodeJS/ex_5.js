var fs = require('fs');

fs.readFile('ex_4.js', function(err,data) {
	if(err)	 {
		console.log(err.stack);
		return;
	}
	console.log(data.toString());
});
