const { createClient } = require('redis');
const { promisify } = require('util');

/**
 * Represents a Redis client.
 */
class RedisClient {
  /**
   * A blueprint for RedisClient instance.
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Checks if this client's connection to the Redis server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Gets the value of a given key.
   * @param {String} stringKey The key of the item to get from the db.
   * @returns {String | Object}
   */
  async get(stringKey) {
    return promisify(this.client.get).bind(this.client)(stringKey);
  }

  /**
   * Stores a key, its value along and assign an expiration time.
   * @param {String} stringKey The key of the item to store ih the db.
   * @param {String | Number | Boolean} value The item to store in the db.
   * @param {Number} duration The expiration time in th db, in seconds.
   * @returns {Promise<void>}
   */
  async set(stringKey, value, duration) {
    await promisify(this.client.set)
      .bind(this.client)(stringKey, value, 'EX', duration);
  }

  /**
   * Removes the value of a given key.
   * @param {String} stringKey The key of the item to remove from the db.
   * @returns {Promise<void>}
   */
  async del(stringKey) {
    await promisify(this.client.del).bind(this.client)(stringKey);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
