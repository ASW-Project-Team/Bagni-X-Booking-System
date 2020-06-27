// Libraries
var express = require('express');
var app = express();


// Homepage route
app.get('/', function (req, res){
  res.send('Hello world!');
});


// Page not found
app.use(function(req, res, next){
  //res.status(404).send({url: req.originalUrl + ' not found'});
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Ops... Pagina non trovata');
});


// Starting the server to listen on port 3000
app.listen(3000, function(){
  console.log('Listening on port 3000')
});
