const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const config = require('./config.json');
const mode = process.argv[2] ? process.argv[2] : '--dev';

// Global configuration object
global.CONFIGS = {
  port: 3000,
  assetsPath: path.resolve(__dirname) + '/assets'
};

switch(mode) {
  case '--integration':
    global.CONFIGS.mongoUrl = `mongodb://${config.mongoUser}:${config.mongoPw}@localhost:27017/bagni_X_booking_system_db`;
    global.CONFIGS.angularClientPath = path.resolve(__dirname) + '/client';
    break;
  case '--prod':
    global.CONFIGS.mongoUrl = `mongodb://${config.mongoUser}:${config.mongoPw}@mongodb:27017/bagni_X_booking_system_db`;
    global.CONFIGS.angularClientPath = path.resolve(__dirname) + '/client';
    break;
  default:
    global.CONFIGS.mongoUrl = `mongodb://${config.mongoUser}:${config.mongoPw}@localhost:27017/bagni_X_booking_system_db`;
    global.CONFIGS.angularClientPath = path.resolve(__dirname) + '/demo-site';
    break;
}

/**
 * Sets up the server.
 */
const main = async function () {
  console.log('BagniX Webserver, v.1.0.0 - Maldini, Gorini, Angelini');
  const app = express();

  try {
    await mongoose.connect(
      CONFIGS.mongoUrl,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        connectTimeoutMS: 30,
      }
    );
    console.log('MongoDB Connected');

  } catch (err) {
    console.log(`Connection to MongoDB failed! ${err}`);
    return;
  }

  // Permits only requests from this domain inside the API
  app.use(cors({
    origin: `http://localhost:${CONFIGS.port}`,
    // some legacy browsers (IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200,
  }));

  // File size optimization in requests
  app.use(compression());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // parse requests of content-type - application/json
  app.use(bodyParser.json());

  // sets the given directories as static, accessible with static urls
  app.use(express.static(CONFIGS.angularClientPath));
  app.use('/assets', express.static(CONFIGS.assetsPath));

  // authentication middleware for /api endpoints only
  const auth = require('./src/utils/authentication');
  app.use('/api', auth.middleware);

  // set up the routes
  const routes = require('./src/routes/routes');
  routes.set(app);

  app.listen(CONFIGS.port, function () {
    console.log(`BagniX webserver started on port ${CONFIGS.port}`);
  });
}

main();
