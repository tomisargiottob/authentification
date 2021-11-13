const path = require('path');
const logger = require('../utils/logger');

function getFailLogin(req, res) {
  logger.info('Error en el login');
  // console.log(req);
  res.render('login-error', {});
}

function getSignup(req, res) {
  res.sendFile(path.join(__dirname, '../views/signup.html'));
}

function getFailSignup(req, res) {
  logger.info('Error en el signup');
  res.render('signup-error', {});
}
function postSignup(req, res) {
  const { user } = req;
  res.render('main', { nombre: user.userName });
}
function postLogin(req, res) {
  const { user } = req;
  res.render('main', { nombre: user.userName });
}
// le saco los parentesis a la funcion de req.isauthenticadted por que aca es donde se rompe todo
function getLogin(req, res) {
  if (req.isAuthenticated) {
    const { user } = req;
    res.render('main', {
      nombre: user.firstName,
    });
  } else {
    logger.info('Usuario no logeado');
    res.render('login', {});
  }
}
module.exports = {
  getFailLogin,
  postLogin,
  getLogin,
  getSignup,
  getFailSignup,
  postSignup,
};
