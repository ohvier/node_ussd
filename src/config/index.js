const {
  PORT = 3000,
  NODE_ENV = 'development',
  DB_URI = '127.0.0.1:11211',
  sessionExpiration = 3600 * 3
} = process.env;

const config = {
  port: PORT,
  env: NODE_ENV,
  dbUri: DB_URI,
  expires: sessionExpiration
};

module.exports = config;
