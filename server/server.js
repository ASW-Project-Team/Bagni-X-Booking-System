const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const productionMode = !!(process.argv[2] && process.argv[2] === '--prod');

// Global configuration object
global.CONFIGS = {
  port: 3000,
  mongoUrl: productionMode
    ? 'mongodb://server:TheSuperServer!46@mongodb:27017/bagni_X_booking_system_db'
    : 'mongodb://server:TheSuperServer!46@localhost:27017/bagni_X_booking_system_db',
  angularClientPath: productionMode
    ? path.resolve(__dirname) + '/client'
    : path.resolve(__dirname) + '/demo-site',
  assetsPath: path.resolve(__dirname) + '/assets'
};


/**
 * Sets up the server.
 */
const main = function () {
  const app = express();

  // wait for mongo init is not necessary anymore, as it is handled by Docker
  mongoose.connect(
    CONFIGS.mongoUrl,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      connectTimeoutMS: 30,
    }).
    then(() => console.log('MongoDB Connected')).
    catch((err) => console.log('Connection failed! ' + err));

  // Permits only requests from this domain inside the API
  app.use(cors({
    origin: 'http://localhost:' + CONFIGS.port,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));

  // File size optimization in requests
  app.use(compression());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // parse requests of content-type - application/json
  app.use(bodyParser.json());

  // sets the directory as static; in other words, accessible with static urls
  app.use(express.static(CONFIGS.angularClientPath));
  app.use('/assets', express.static(CONFIGS.assetsPath));

  // authentication middleware
  const jwt = require('./src/authentication/jwtMiddleware');
  //app.use(jwt());

  const routes = require('./src/routes/routes');
  routes.set(app);

  app.listen(CONFIGS.port, function () {
    console.log('BagniX webserver started on port ' + CONFIGS.port);
  });
}

main();
