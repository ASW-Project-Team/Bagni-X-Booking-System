const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const compression = require("compression");


global.appRoot = path.resolve(__dirname);
var PORT = 3000;
const CLIENT_APP_FOLDER = '/dist/client';

//mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useFindAndModify: false });

// Permits only requests from this domain inside the API
app.use(cors())

// File size optimization in requests
app.use(compression());

// Used to access parameters in HTTP requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + CLIENT_APP_FOLDER));

var routes = require('./src/routes/moviesRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(PORT, function () {
  console.log('BagniX API server started on port ' + PORT);
});
