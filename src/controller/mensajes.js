const { Router } = require('express');
const message = require('../models/mensajes-model');

const messagesRouter = new Router();

messagesRouter.get('', async (req, res) => {
  const mensajes = await message.find();
  res.status(200).send(mensajes);
});

messagesRouter.post('', async (req, res) => {
  const { user, text, time } = req.body;
  const userMessage = { user, text, time };
  await message.create(userMessage);
  res.status(200).send({ message: 'success' });
});

module.exports = { messagesRouter };
