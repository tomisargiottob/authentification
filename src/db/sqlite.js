const knex = require('knex');

class Database {
  constructor() {
    this.config = {
      client: 'sqlite3',
      connection: { filename: './src/db/ecommerce.sqlite' },
      useNullAsDefault: true,
    };
    this.client = knex(this.config);
  }
}

module.exports = new Database();
