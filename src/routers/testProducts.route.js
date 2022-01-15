const express = require('express');
const {
  getTestProducts,
} = require('../controller/productos-test');

const testProductsRouter = express.Router();

testProductsRouter.get('/', getTestProducts);

module.exports = { testProductsRouter };
