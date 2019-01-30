var express = require('express');
var bodyParser = require('body-parser');
var urlEncoder = bodyParser.urlencoded({extended: false});

var app = express();
app.set('view engine','ejs');

app.get('/',function(req,res) {
	res.render('home');
});

app.get('/contact',function(req,res) {
	res.render('contact');
});


app.post('/contact',urlEncoder, function(req,res) {
	console.log(req.body.id[4]);
	res.render('contact_success',{data: req.body});
});

app.use('/assets',express.static('assets'));

app.get('/:id',function(req,res) {
	var data = {age: 29, job: 'cultivator', hobbies: ['eating','fishing','dance','sing']};
	res.render('index',{person: req.params.id, data: data});		
});

app.listen(3000);
