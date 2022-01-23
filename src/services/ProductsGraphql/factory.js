/* eslint-disable class-methods-use-this */
const ProductDaoFactory = require('../Products/factory');

const products = ProductDaoFactory.getDao();

class ProductGraphql {
  async create({ data }) {
    const product = await products.create(data);
    return product;
  }

  async getAll({ field, value }) {
    const foundProducts = await products.getAll(field, value);
    return foundProducts;
  }

  async find({ id }) {
    const product = await products.find(id);
    return product;
  }

  async update({ id, data }) {
    const product = await products.update(id, data);
    return product;
  }

  async delete({ id }) {
    const product = await products.delete(id);
    return product;
  }
}

module.exports = new ProductGraphql();
