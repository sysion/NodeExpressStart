const http = require('http');
const express = require('express');
//const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require("path");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const db = require('./db/houses.json');


var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8042;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});


app.get('/api/houses', function(req, res){
  //res.send('hi yaa');   //testing ok
  res.type('application/json');
  res.send(db);
});

/*app.get('/api/house', function(req, res){
  res.type('application/json');
  res.send(db);
});*/

server.listen(port, function(){
  console.log('server running on http://localhost:' + port);
});





//App Config
//Middlewares
//DB Config
//API Endpoints
//Listener
//1hr40min