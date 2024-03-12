const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
    const port = process.env.DB_PORT ? process.env.DB_PORT : '27017';
    const database = process.env.DB_DATABASE ? process.env.DB_DATABASE : 'file_manager';
    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.client.db().collection('users').countDocuments();
    return users;
  }

  async nbFiles() {
    const files = this.client.db().collection('files').countDocuments();
    return files;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
