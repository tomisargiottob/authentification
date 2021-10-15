const config = require('config');
const mongoose = require('mongoose');

mongoose.connect(
  config.mongodb.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('connected to db');
    }
  },
);
