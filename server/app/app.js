const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const compression = require("compression");

global.ANGULAR_CLIENT_PATH = path.resolve(__dirname) + '/client/dist/client';
const port = 3000;

const main = function () {
    //waitForMongoInit();

    // Permits only requests from this domain inside the API
    app.use(cors({
        origin: "http://localhost:" + port,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }))

    // File size optimization in requests
    app.use(compression());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: true}));

    // parse requests of content-type - application/json
    app.use(bodyParser.json());

    app.use(express.static(ANGULAR_CLIENT_PATH));

    const routes = require('./src/routes/routes');
    routes.set(app);

    app.listen(port, function () {
        console.log('BagniX API server started on port ' + port);
    });
}


const waitForMongoInit = function () {
    console.log('Waiting while MongoDB container is setting up...');
    var date = new Date();
    var curDate = null;
    do {
        curDate = new Date();
    }
    while (curDate - date < 10000);

    console.log('Starting MongoDB connection...');

    mongoose.connect(
        'mongodb://mongodb:27017/dbsa',
        {
            useNewUrlParser: true,
            useFindAndModify: false,
            connectTimeoutMS: 30
        })
        .then(() => console.log('MongoDB Connected'))
        .catch((err) => console.log('Connection failed!' + err));
}

main();
