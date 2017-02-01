var http = require('http');
var path = require('path');

var express = require('express');
var router = require('./api/router');
var socket = require('./api/socket');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(express.static(path.resolve(__dirname, 'client')));
router(app);

var server = http.createServer(app);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("API server listening at", addr.address + ":" + addr.port);
});
