const express = require('express');
const config = require('config');
const handlebars = require('express-handlebars');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { passport } = require('./utils/passport.util');
const { router } = require('./routers/auth.route');
// eslint-disable-next-line no-unused-vars
const db = require('./models/db');
const { productosRouter } = require('./controller/productos');
const { productosTestRouter } = require('./controller/productos-test');
const { messagesRouter } = require('./controller/mensajes');

const app = express();
const PORT = config.app.port || 8080;

app.use(cookieParser(config.secret));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/products', productosRouter);
app.use('/products-test', productosTestRouter);
app.use('/messages', messagesRouter);
app.use('', router);
app.use(cors());

app.use(express.static('public'));
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    maxAge: 300000,
    httpOnly: false,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.engine(
  'hbs',
  handlebars({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
  }),
);

app.set('views', './src/views');
app.set('view engine', 'hbs');

console.log(passport);
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    console.log('aqui');
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie('connect.sid').redirect('/login');
});

app.get('/home', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('main', {
      nombre: req.user.displayName,
      foto: req.user.photos[0].value,
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/failLogin',
}));

app.listen(PORT, () => {
  console.log(`Server up and listening on http://localhost:${PORT}`);
});

app.on('error', (err) => {
  console.log(err);
});
