const knex = require('knex');
const config = require('config');

class Database {
  constructor() {
    this.config = {
      client: 'mysql2',
      connection: config.db,
    };
    this.client = knex(this.config);
  }
}

module.exports = new Database();
