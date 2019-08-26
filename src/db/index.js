const logger = require('../config/logger');
const config = require('../config/index');
const Memcached = require('memcached');

const client = new Memcached(config.dbUri, {
  retries: 10,
  retry: 10000,
  remove: true
});
client.connect(
  config.dbUri,
  (err, conn) => {
    if (err) {
      logger.info(`Database connection to MEMCACHED failed ${conn.server} ${err}!`);
      return process.exit(1);
    }
    logger.info(`MEMCACHED DB connection successfull!!`);
  }
);
module.exports = client;
