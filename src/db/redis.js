// The Redis client
const redis = require("redis");
const config = require("../config");
const logger = require("../config/logger");
// const { REDIS_NID_PREFIX } = require('../utils/constants');

const ONE_DAY = 60 * 60 * 24; // One day

const client = redis.createClient(config.redisPort, config.redisHost, {
  password: config.redisSecret
});

const REDIS_DATABASE = 3; // not the default one

client.select(REDIS_DATABASE);

client.on("connect", () => {
  logger.info("Connected to Redis live");
});

client.on("error", error => {
  logger.error({ error }, "Unable to connect to Redis live");
});

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

const set = async (hashKey, data, expirationTime = ONE_DAY) => {
  if (typeof data == "object") data = JSON.stringify(data);
  return await setAsync(hashKey, data, "EX", expirationTime);
};

const get = async hashKey => {
  let results = await getAsync(hashKey);
  if (results && results.charAt(0) == "{") results = JSON.parse(results);
  return results;
};

const delKey = async hashKey => {
  return await delAsync(hashKey);
};

module.exports = { set, get, delKey, client };
