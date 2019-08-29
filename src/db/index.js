const logger = require('../config/logger');
const config = require('../config/index');
const Memcached = require('memcached');

const client = new Memcached(config.dbUri, {
  retries: 10,
  retry: 10000,
  remove: true
});

client.connect(config.dbUri, (err, conn) => {
  if (err) throw new Error('Failed to connect');

  console.log(`MEMCACHED DB connection successfull!!`);
});

module.exports = client;
