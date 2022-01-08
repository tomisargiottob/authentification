const { Router } = require('express');
const ProductDaoFactory = require('../services/factory');

const products = ProductDaoFactory.getDao();
ProductDaoFactory.getDao();


const productosRouter = new Router();

productosRouter.get('', async (req, res) => {
  const productos = await products.getAll();
  res.status(200).send(productos);
});

productosRouter.post('', async (req, res) => {
  const { product } = req.body;
  await products.create(product);
  res.status(200).send({ message: 'success' });
});

module.exports = { productosRouter };
