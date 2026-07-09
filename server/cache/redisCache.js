const { createClient } = require("redis");
const dotenv = require("dotenv");

dotenv.config();

const redisHost = process.env.REDIS_HOST || "127.0.0.1";
const redisPort = Number(process.env.REDIS_PORT || 6380);
const maxRetries = 10;
const retryDelayMs = 2000;

const client = createClient({
  socket: {
    host: redisHost,
    port: redisPort,
  },
});

client.on("error", (err) => console.error("Redis Client Error:", err.message));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectRedis(retryCount = 0) {
  try {
    await client.connect();
    console.log(`Redis connected successfully at ${redisHost}:${redisPort}`);
  } catch (err) {
    if (retryCount < maxRetries) {
      console.warn(`Redis not ready yet at ${redisHost}:${redisPort}. Retrying in ${retryDelayMs / 1000} seconds...`);
      await sleep(retryDelayMs);
      return connectRedis(retryCount + 1);
    }

    console.error(`Redis connection failed after ${maxRetries + 1} attempts at ${redisHost}:${redisPort}:`, err.message);
  }
}

connectRedis();

module.exports = { client };
