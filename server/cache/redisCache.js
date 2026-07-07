const { createClient } = require("redis");

const client = createClient();

client.on("error", (err) => console.error("Redis Client Error", err));

async function connectRedis() {
  await client.connect();
}
connectRedis();

module.exports = { client };
