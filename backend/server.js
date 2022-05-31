const http = require('http');
const express = require('express');
const cors = require('cors');                 //required for testing - Cross-Origin Resource Sharing
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

app.use(cors({
    origin: 'http://127.0.0.1:8080'
}));

/*app.use(cors({ //ok
    origin: ['http://127.0.0.1:8080', 'http://127.0.0.1:9238']
}));

app.use(cors({ //ok
    origin: '*'
}));*/

app.get('/api/houses', function(req, res){
  //res.send('hi yaa');   //testing ok
  res.type('application/json');
  res.send(db);
});

app.get('/api/houses/:id', function(req, res){
  res.type('application/json');
  let house = '';
  const id = req.params.id;     // get id from the URL
  db.forEach((hs) => {
    if (hs['id'] === parseInt(id)){ //id in URL is string hence needs to be converted to integer number
      house = hs;
    }
  });
  res.send(house);
});

// images, css and html files are STATIC files hence pass express.static to app.use
//app.use(express.static(path.join(__dirname,'./db/images')));    //images served at url http://127.0.0.1:8042/house-05.jpg
//app.use(express.static(path.join(__dirname,'./')));   //images served at url http://127.0.0.1:8042/db/images/house-05.jpg
app.use(express.static(__dirname));                   //images served at url http://127.0.0.1:8042/db/images/house-05.jpg

//error => Cannot GET /db/images/house-05.jpg
app.get('/images/:name', function(req, res){
  res.type('application/blob');
  const name = req.params.name;     // get name from the URL
  //res.send('http://127.0.0.1:8042/db/images/' + name);        //nok
  //res.sendFile(path.join(__dirname, './db/images' + name));   //nok
  res.sendFile(path.join(__dirname, name));
  //res.sendFile(path.join(__dirname, './' + name));            //nok

  /* Searching books for the isbn
  for (let book of books) {
    if (book.isbn === isbn) {
      res.json(book);
      return;
    }
  }

  // Sending 404 when not found something is a good practice
  res.status(404).send('Book not found');*/
});

app.get('/api/house/:code', function(req, res){
  res.type('application/json');
  const code = req.params.code;     // get code from the URL
  
  db.forEach((house) => {
    if (house.code === code) {
      res.send(house);
      return;
    }
  });
});

server.listen(port, function(){
  console.log('server running on http://localhost:' + port);
});





//App Config
//Middlewares
//DB Config
//API Endpoints
//Listener
//1hr40min
//2hr30min