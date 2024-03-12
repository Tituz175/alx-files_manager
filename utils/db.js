const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
    const port = process.env.DB_PORT ? process.env.DB_PORT : '27017';
    this.database = process.env.DB_DATABASE ? process.env.DB_DATABASE : 'file_manager';
    const url = `mongodb://${host}:${port}`;
    this.connected = false;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.connected = true;
    }).catch(() => console.log('error.message'));
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    await this.client.connect();
    const users = this.client.db(this.database).collection('users').countDocuments();
    return users;
  }

  async nbFiles() {
    await this.client.connect();
    const files = this.client.db(this.database).collection('files').countDocuments();
    return files;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
