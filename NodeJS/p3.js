var fs = require('fs')

var file = fs.readFileSync('p1.js','utf-8');

console.log(file);

fs.writeFileSync('x.txt',file);
