const passport = require('passport');
const { Strategy } = require('passport-facebook');
const LocalStrategy = require('passport-local').Strategy;
const config = require('config');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

function isValidPasword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use('facebook', new Strategy({
  clientID: config.facebook.id,
  clientSecret: config.facebook.secret2,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos'],
  scope: ['email'],
}, (accessToken, refreshToken, userProfile, done) => done(null, userProfile)));

passport.use('login', new LocalStrategy(
  (username, password, done) => {
    console.log('entra aqui para verificar');
    UserModel.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        console.log('no existe el usuario');
        return done(null, false);
      }
      if (!isValidPasword(user, password)) {
        console.log('invalid password');
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
      console.log('usuario existe');
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
    console.log('usuario creado');
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});

module.exports = { passport };
