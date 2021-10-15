const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('mensaje', Schema);
