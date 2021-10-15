const express = require('express');
const { passport } = require('../utils/passport.util');
const {
  getFailLogin,
  getLogin,
  postSignup,
  getSignup,
  getFailSignup,
  postLogin,
} = require('../controller/auth.controller');

const router = express.Router();

router.get('/failLogin', getFailLogin);
router.post('/login', passport.authenticate('login', { failureRedirect: '/failLogin' }), postLogin);
router.get('/login', getLogin);

router.get('/signup', getSignup);
router.post('/signup', passport.authenticate('signup', { failureRedirect: '/failSignup' }), postSignup);
router.get('/failSignup', getFailSignup);

module.exports = { router };
