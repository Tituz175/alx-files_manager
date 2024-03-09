const { createClient } = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err));
    this.connected = false;
    this.client.on('connect', () => {
      this.connected = true;
    });
  }

  isAlive() {
    return this.connected;
  }

  async get(stringKey) {
    const asyncGet = promisify(this.client.get).bind(this.client);
    const response = await asyncGet(stringKey);
    return response;
  }

  async set(stringKey, value, duration) {
    const asyncSet = promisify(this.client.set).bind(this.client);
    await asyncSet(stringKey, value, 'EX', duration);
  }

  async del(stringKey) {
    const asyncDel = promisify(this.client.del).bind(this.client);
    await asyncDel(stringKey);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
