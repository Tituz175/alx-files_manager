/* eslint-disable import/no-named-as-default */
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

export default class AppController {
  /**
   * Retrieves the status of the application including the status of Redis and the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} - JSON response with the status of Redis and the database.
   */
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  /**
   * Retrieves statistics including the number of users and files.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} - JSON response with the number of users and files.
   */
  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount });
      });
  }
}
