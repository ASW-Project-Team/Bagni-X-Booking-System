const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const config = require('./config.json');
const productionMode = !!(process.argv[2] && process.argv[2] === '--prod');

// Global configuration object
global.CONFIGS = {
  port: 3000,
  mongoUrl: productionMode
    ? `mongodb://${config.mongoUser}:${config.mongoPw}@mongodb:27017/bagni_X_booking_system_db`
    : `mongodb://${config.mongoUser}:${config.mongoPw}@localhost:27017/bagni_X_booking_system_db`,
  angularClientPath: productionMode
    ? path.resolve(__dirname) + '/client'
    : path.resolve(__dirname) + '/demo-site',
  assetsPath: path.resolve(__dirname) + '/assets'
};


/**
 * Sets up the server.
 */
const main = async function () {
  const app = express();

  // wait for mongo init is not necessary anymore, as it is handled by Docker
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
  const authMiddleware = require('./src/authentication/middleware');
  app.use('/api', authMiddleware.authenticate);

  // set up the routes
  const routes = require('./src/routes/routes');
  routes.set(app);

  app.listen(CONFIGS.port, function () {
    console.log(`BagniX webserver started on port  ${CONFIGS.port}`);
  });
}

main();
