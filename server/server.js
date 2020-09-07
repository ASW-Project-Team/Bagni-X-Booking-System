const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');

const port = 3000;
const productionMode = !!(process.argv[2] && process.argv[2] === '--prod');
const mongoUrl = productionMode
  ? 'mongodb://mongodb:27017/bagni_X_booking_system_db'
  : 'mongodb://localhost:27017/bagni_X_booking_system_db';
global.ANGULAR_CLIENT_PATH = productionMode
  ? path.resolve(__dirname) + '/client'
  : path.resolve(__dirname) + '/demo-site';

const main = function () {
  // wait for mongo init is not necessary anymore, as it is handled by Docker
  mongoose.connect(
    mongoUrl,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      connectTimeoutMS: 30,
    }).
    then(() => console.log('MongoDB Connected')).
    catch((err) => console.log('Connection failed!' + err))

  // Permits only requests from this domain inside the API
  app.use(cors({
    origin: 'http://localhost:' + port,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }))

  // File size optimization in requests
  app.use(compression())

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }))

  // parse requests of content-type - application/json
  app.use(bodyParser.json())

  // sets the directory as static; in other words, accessible with static urls
  app.use(express.static(ANGULAR_CLIENT_PATH))
  app.use('/assets', express.static(path.resolve(__dirname) + '/assets'));

  // authentication middleware
  const jwt = require('./src/authentication/jwtMiddleware');
  app.use(jwt())

  const routes = require('./src/routes/routes')
  routes.set(app)

  app.listen(port, function () {
    console.log('BagniX webserver started on port ' + port)
  })
}

main()
