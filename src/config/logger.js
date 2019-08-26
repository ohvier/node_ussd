const bunyan = require('bunyan');
const logger = bunyan.createLogger({ name: 'ussd-sns' });
module.exports = logger;
