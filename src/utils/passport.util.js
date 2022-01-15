const passport = require('passport');
// const { Strategy } = require('passport-facebook');
const LocalStrategy = require('passport-local').Strategy;
// const config = require('config');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

function isValidPasword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use('login', new LocalStrategy(
  (username, password, done) => {
    UserModel.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false);
      }
      if (!isValidPasword(user, password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  },
));

passport.use('signup', new LocalStrategy({
  passReqToCallback: true,
}, async (req, username, password, done) => {
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
  const newUser = {
    username,
    password: createHash(password),
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  UserModel.create(newUser, (err, user) => {
    if (err) return done(err);
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  // eslint-disable-next-line no-underscore-dangle
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  UserModel.findById(id, done);
});

module.exports = { passport };
