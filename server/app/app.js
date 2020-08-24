const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const compression = require("compression");
const DOCKER = false;


// auth
const jwt = require('./src/auth/_helpers/jwt');
const errorHandler = require('./src/auth/_helpers/error-handler');
// end auth

global.ANGULAR_CLIENT_PATH = path.resolve(__dirname) + '/client/dist/client';
const port = 3000;

const main = function () {
    waitForMongoInit();

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

    // auth
    app.use(jwt());
    //app.use('/users', require('./src/auth/users/users.controller'));
    app.use(errorHandler);
    // end auth

    const routes = require('./src/routes/routes');
    routes.set(app);

    app.listen(port, function () {
        console.log('BagniX webserver started on port ' + port);
    });
}


const waitForMongoInit = function () {
    if (DOCKER) {
        console.log('Waiting while MongoDB container is setting up...');
        let date = new Date(); // var?
        let curDate = null;  // var?
        do {
            curDate = new Date();
        }
        while (curDate - date < 10000);

        console.log('Starting MongoDB connection...');
    }

    mongoose.connect(
        // localhost -> database:27017
        'mongodb://localhost/bagni_X_booking_system_db',
        {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            connectTimeoutMS: 30
        })
        .then(() => console.log('MongoDB Connected'))
        .catch((err) => console.log('Connection failed!' + err));


    /*    const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://test<password>:@bagnixbookingsystem-ed7uh.gcp.mongodb.net/BagniXBookingSystem?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            connectTimeoutMS: 30 });
        client.connect(err => {
            const collection = client.db("test").collection("devices");
            // perform actions on the collection object
            client.close();
        });*/



}

main();