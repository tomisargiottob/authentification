const db = require('../db/sqlite');

class Message {
  constructor() {
    this.client = db.client;
    this.createTable();
  }

  async createTable() {
    try {
      const exists = await this.client.schema.hasTable('messages');
      if (!exists) {
        await this.client.schema.createTable('messages', (table) => {
          table.increments('id').primary().notNullable();
          table.string('user').notNullable();
          table.string('text').notNullable();
          table.integer('time').notNullable();
        });
      } else {
        console.log('table messages already exists');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    let messages = [];
    try {
      messages = await this.client.select().from('messages');
    } catch (error) {
      console.log(error);
    }
    return messages;
  }

  async createMessage(message) {
    try {
      await this.client.insert(message).from('messages');
      console.log('message inserted');
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Message;
