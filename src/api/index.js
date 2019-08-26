const config = require('../config');
const logger = require('../config/logger');
const ussd = require('../ussd');

const mountRoutes = app => {
  app.use('/', ussd);
};

module.exports = {
  mountRoutes
};
