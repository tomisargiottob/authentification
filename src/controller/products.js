const ProductDaoFactory = require('../services/Products/factory');

const products = ProductDaoFactory.getDao();

async function getProducts(req, res) {
  const productos = await products.getAll();
  res.status(200).send(productos);
}

async function findProduct(req, res) {
  const { id } = req.params;
  try {
    const producto = await products.find(id);
    res.status(200).send(producto);
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

async function createProduct(req, res) {
  const { product } = req.body;
  try {
    await products.create(product);
    res.status(200).send({ message: 'success' });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { product } = req.body;
  try {
    const updatedProduct = await products.update(id, product);
    res.status(200).send({ message: 'success', product: updatedProduct });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

async function removeProduct(req, res) {
  const { id } = req.params;
  try {
    await products.delete(id);
    res.status(200).send({ message: 'success' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  removeProduct,
  findProduct,
};
