// src/config/redis.js
const Redis = require("ioredis");
const logger = require("../utils/logger");
const config = require("./envConfig");

const redisClient = new Redis({
    host: config.REDIS_HOST || "127.0.0.1",
    port: config.REDIS_PORT || 6379
});

redisClient.on("connect", () => logger.info("Connected to Redis"));
redisClient.on("error", (err) => logger.error(`Error connecting to Redis: ${err}`));

module.exports = redisClient;
