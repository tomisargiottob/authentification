/* eslint-disable no-underscore-dangle */
const { v4: uuid } = require('uuid');
const MessageDao = require('./messageDAO');
const returnMessages = require('./messageDTO');

let instance;

class MessageDaoMemory extends MessageDao {
  constructor(logger) {
    super(logger);
    this.messages = [];
  }

  async getAll() {
    return this.messages;
  }

  async find(id) {
    const message = this.messages.find((msg) => {
      if (msg.id === id) {
        return msg;
      }
      return false;
    });
    if (message) {
      return returnMessages(message);
    }
    throw new Error('msg not found');
  }

  async update(id, data) {
    const message = this.messages.findIndex((msg) => {
      if (msg.id === id) {
        return msg;
      }
      return false;
    });
    if (message >= 0) {
      this.messages[0] = data;
      this.messages[0].id = id;
      return returnMessages(this.messages[0]);
    }
    throw new Error('msg not found');
  }

  async delete(id) {
    this.messages = this.messages.filter((msg) => msg.id !== id);
    return true;
  }

  async create(data) {
    const msg = {
      id: uuid(),
      text: data.text,
      user: data.user,
      time: data.time,
    };
    this.messages.push(msg);
    return returnMessages(this.messages);
  }

  static getInstance(logger) {
    if (instance) {
      logger.info('devuelvo la instancia ya existente');
      return instance;
    }
    instance = new MessageDaoMemory(logger);
    return instance;
  }
}

module.exports = MessageDaoMemory;
