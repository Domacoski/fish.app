var express = require('express');
var server = express();
server.use(express.static(`${__dirname}/`));
server.listen(9091);
console.log('start in. ')