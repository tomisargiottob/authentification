const { Router } = require('express');
const Product = require('../models/productos');

const products = new Product();

const productosRouter = new Router();

productosRouter.get('', async (req, res) => {
  const productos = await products.getAll();
  res.status(200).send(productos);
});

productosRouter.post('', async (req, res) => {
  const { product } = req.body;
  await products.createProduct(product);
  res.status(200).send({ message: 'success' });
});

module.exports = { productosRouter };
