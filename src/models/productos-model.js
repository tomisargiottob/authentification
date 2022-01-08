const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const Schema = mongoose.Schema({
  id: {
    type: String,
    default: function genUUID() {
      return uuid.v1();
    },
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('producto', Schema);
