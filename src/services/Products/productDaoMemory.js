/* eslint-disable no-underscore-dangle */
const { v4: uuid } = require('uuid');
const ProductDao = require('./productDAO');
const returnProducts = require('./productDTO');

let instance;

class ProductDaoMemory extends ProductDao {
  constructor(logger) {
    super(logger);
    this.products = [];
  }

  async getAll() {
    return this.products;
  }

  async find(id) {
    const producto = this.products.find((product) => {
      if (product.id === id) {
        return product;
      }
      return false;
    });
    if (producto) {
      console.log(producto);
      return returnProducts(producto);
    }
    throw new Error('Product not found');
  }

  async update(id, data) {
    if (!data.name || !data.price || !data.thumbnail) {
      throw new Error('Missing information, product should have name, price and thumbnail');
    }
    const producto = this.products.findIndex((product) => {
      if (product.id === id) {
        return product;
      }
      return false;
    });
    if (producto >= 0) {
      this.products[0] = data;
      this.products[0].id = id;
      return returnProducts(this.products[0]);
    }
    throw new Error('Product not found');
  }

  async delete(id) {
    this.products = this.products.filter((product) => product.id !== id);
    return true;
  }

  async create(data) {
    if (!data.name || !data.price || !data.thumbnail) {
      throw new Error('Missing information, product should have name, price and thumbnail');
    }
    const product = {
      id: uuid(),
      name: data.name,
      price: data.price,
      thumbnail: data.thumbnail,
    };
    this.products.push(product);
    return returnProducts(this.products);
  }

  static getInstance(logger) {
    if (instance) {
      logger.info('devuelvo la instancia ya existente');
      return instance;
    }
    instance = new ProductDaoMemory(logger);
    return instance;
  }
}

module.exports = ProductDaoMemory;
