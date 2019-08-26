const express = require('express');
const config = require('./config');
const logger = require('./config/logger');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./api');
const validator = require('express-validator');
const app = express();
app.use(
  validator({
    customValidators: {
      isRwandanPhone: val => {
        return /^2507\d{8}$/.test(val);
      }
    }
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
	The routes ...
*/
api.mountRoutes(app);

app.listen(config.port, () => logger.info(`Service listening on port ${config.port}!`));
