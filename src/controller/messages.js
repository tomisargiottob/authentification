const logger = require('../utils/logger');
const MessageDaoFactory = require('../services/Messages/factory');

const messages = MessageDaoFactory.getDao();

async function getMessages(req, res) {
  try {
    const mensajes = await messages.getAll();
    res.status(200).send(mensajes);
  } catch {
    logger.error('Messages could not be fetched');
    res.status(500).send('Messages could not be fetched');
  }
}

async function createMessage(req, res) {
  const { user, text, time } = req.body;
  const userMessage = { user, text, time };
  console.log(userMessage);
  try {
    await messages.create(userMessage);
    res.status(200).send({ message: 'success' });
  } catch (err) {
    logger.error('Could not save message', err.message);
    res.status(500).send('Could not save message');
  }
}

module.exports = { getMessages, createMessage };
