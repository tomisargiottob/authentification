const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const Schema = mongoose.Schema({
  id: {
    type: String,
    default: function genUUID() {
      return uuid.v1();
    },
  },
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
