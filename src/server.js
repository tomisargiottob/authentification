const express = require('express');
// const config = require('config');
const handlebars = require('express-handlebars');
const session = require('express-session');
const cors = require('cors');
const minimist = require('minimist');
const cookieParser = require('cookie-parser');
const os = require('os');
const cluster = require('cluster');
const { fork } = require('child_process');
const compression = require('compression');
const { graphqlHTTP } = require('express-graphql');
const crypto = require('crypto');
const logger = require('./utils/logger');
const aleatorio = require('./utils/calculo');
const { passport } = require('./utils/passport.util');
const { router } = require('./routers/auth.route');

require('dotenv').config();
// eslint-disable-next-line no-unused-vars
const db = require('./models/db');
const { productsRouter } = require('./routers/products.route');
const { testProductsRouter } = require('./routers/testProducts.route');
const { messagesRouter } = require('./routers/messages.route');
const schema = require('./models/product-schema');
const ProductDaoFactory = require('./services/Products/factory');

const nCpus = os.cpus().length;
const args = minimist(process.argv.slice(2), {
  default: {
    n: 1000000000,
    p: process.env.p || 3000,
    m: process.env.m || 'fork',
    d: process.env.d,
  },
});

const products = ProductDaoFactory.getDao();

if (args.m === 'cluster') {
  if (cluster.isMaster) {
    logger.info(`Master PID ${process.pid} is running`);
    for (let i = 0; i < nCpus; i += 1) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      logger.info(`Worker PID ${worker.process.pid} has exited`);
    });
  } else {
    logger.info(`Worker PID ${process.pid} is running`);
    const app = express();
    app.use(session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        maxAge: 300000,
        httpOnly: false,
        secure: false,
      },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cookieParser(process.env.SECRET));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
      logger.info({ route: req.url, method: req.method }, 'Request incomming');
      next();
    });
    app.use('/products', productsRouter);
    app.use('/products-test', testProductsRouter);
    app.use('/messages', messagesRouter);
    app.use('', router);
    app.use('/graphql', graphqlHTTP({
      schema,
      rootValue: {
        getProducts: products.getAll,
        getProduct: products.find,
        createProduct: products.create,
        updateProduct: products.update,
        deleteProduct: products.delete,
      },
      graphiql: true,
    }));
    app.use(cors());

    app.use(express.static('public'));

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

    app.get('/', (req, res) => {
      if (req.isAuthenticated()) {
        res.redirect('/home');
      } else {
        res.redirect('/login');
      }
    });
    app.get('/info', compression(), (req, res) => {
      res.render('info', {
        argumentos: JSON.stringify(args),
        plataforma: process.platform,
        path: process.cwd(),
        id: process.pid,
        memory: process.memoryUsage().rss,
        version: process.version,
        cpus: nCpus,
      });
    });

    const computo = fork('./src/utils/calculo.js');
    app.get('/random', (req, res) => {
      computo.on('message', (resultado) => {
        res.status(200).json(resultado);
      });
      computo.send(args.n);
    });

    app.get('/logout', (req, res) => {
      req.logout();
      res.clearCookie('connect.sid').redirect('/');
    });

    app.get('/home', (req, res) => {
      if (req.isAuthenticated()) {
        res.render('main', {
          nombre: req.user.displayName || req.user.username,
          url: process.env.URL,
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
    app.all('*', (req, res) => {
      logger.warn({ route: req.url, method: req.method }, 'Route not defined');
      res.send('Route not defined');
    });
    app.listen(args.p, () => {
      logger.info(`Server up and listening on http://localhost:${args.p}`);
    });

    app.on('error', (err) => {
      logger.error(err);
    });
  }
} else {
  logger.info(`Mode fork process ${process.pid} is running`);
  const app = express();
  app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 300000,
      httpOnly: false,
      secure: false,
    },
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser(process.env.SECRET));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use((req, res, next) => {
    logger.info({ route: req.url, method: req.method }, 'Request incomming');
    next();
  });
  app.use('/products', productsRouter);
  app.use('/products-test', testProductsRouter);
  app.use('/messages', messagesRouter);
  app.use('', router);

  app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: {
      getProducts: products.getAll,
      getProduct: products.find,
      createProduct: products.create,
      updateProduct: products.update,
      deleteProduct: products.delete,
    },
    graphiql: true,
  }));

  app.use(cors());
  app.use(express.static('public'));
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

  app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/home');
    } else {
      res.redirect('/login');
    }
  });
  app.get('/infoConsole', compression(), (req, res) => {
    res.render('info', {
      argumentos: JSON.stringify(args),
      plataforma: process.platform,
      path: process.cwd(),
      id: process.pid,
      memory: process.memoryUsage().rss,
      version: process.version,
      cpus: nCpus,
    });
  });
  app.get('/info', compression(), (req, res) => {
    res.render('info', {
      argumentos: JSON.stringify(args),
      plataforma: process.platform,
      path: process.cwd(),
      id: process.pid,
      memory: process.memoryUsage().rss,
      version: process.version,
      cpus: nCpus,
    });
  });

  // const computo = fork('./src/utils/calculo.js');
  app.get('/random', async (req, res) => {
    // computo.on('message', (resultado) => {
    //   res.status(200).json(args.p, resultado);
    // });
    // computo.send(args.n);
    const resultado = await aleatorio(args.n);
    res.status(200).json(resultado);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.clearCookie('connect.sid').redirect('/');
  });

  app.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
      res.render('main', {
        nombre: req.user.displayName || req.user.username,
        url: process.env.URL,
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
  app.all('*', (req, res) => {
    logger.warn({ route: req.url, method: req.method }, 'Route not defined');
    res.send('Route not defined');
  });

  app.listen(process.env.PORT || 3000, () => {
    logger.info(`Server up and listening on http://localhost:${args.p}`);
  });

  app.on('error', (err) => {
    logger.error(err);
  });
}
