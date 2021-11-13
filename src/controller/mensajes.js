const { Router } = require('express');
const message = require('../models/mensajes-model');
const logger = require('../utils/logger');

const messagesRouter = new Router();

messagesRouter.get('', async (req, res) => {
  try {
    const mensajes = await message.find();
    res.status(200).send(mensajes);
  } catch {
    logger.error('Messages could not be fetched');
    res.status(500).send('Messages could not be fetched');
  }
});

messagesRouter.post('', async (req, res) => {
  const { user, text, time } = req.body;
  const userMessage = { user, text, time };
  try {
    await message.create(userMessage);
    res.status(200).send({ message: 'success' });
  } catch {
    logger.error('Could not save message');
    res.status(500).send('Could not save message');
  }
});

module.exports = { messagesRouter };
