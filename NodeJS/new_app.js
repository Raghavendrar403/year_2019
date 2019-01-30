var express = require('express')

var	app = express();
app.set('view engine','ejs');
app.use(express.static('./'));

app.get('/',function(req,res) {
	console.log(global.x);	
	res.render('new_app');
});

app.listen(4000);
