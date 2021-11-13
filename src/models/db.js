const config = require('config');
const mongoose = require('mongoose');
const logger = require('../utils/logger');

mongoose.connect(
  config.mongodb.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info('connected to db');
    }
  },
);
