const express = require('express');
const {
  getProducts,
  createProduct,
  removeProduct,
  updateProduct,
  findProduct,
} = require('../controller/products');

const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.post('/', createProduct);
productsRouter.get('/:id', findProduct);
productsRouter.delete('/:id', removeProduct);
productsRouter.put('/:id', updateProduct);

module.exports = { productsRouter };
