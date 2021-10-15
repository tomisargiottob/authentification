const path = require('path');

function getFailLogin(req, res) {
  console.log('Error en el login');
  console.log(req);
  res.render('login-error', {});
}

function getSignup(req, res) {
  res.sendFile(path.join(__dirname, '../views/signup.html'));
}

function getFailSignup(req, res) {
  console.log('Error en el signup');
  res.render('signup-error', {});
}
function postSignup(req, res) {
  const { user } = req;
  console.log(user);
  res.render('main', { nombre: user.userName });
}
function postLogin(req, res) {
  console.log('entra al post login');
  const { user } = req;
  console.log(user);
  res.render('main', { nombre: user.userName });
}

function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const { user } = req;
    console.log('usuario loggeado');
    res.render('main', {
      nombre: user.firstName,
    });
  } else {
    console.log('Usuario no logeado');
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
