const express = require('express');
const {
  getMessages,
  createMessage,
} = require('../controller/messages');

const messagesRouter = express.Router();

messagesRouter.get('/', getMessages);
messagesRouter.post('/', createMessage);

module.exports = { messagesRouter };
