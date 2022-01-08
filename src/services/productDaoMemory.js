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
    return returnProducts(producto);
  }

  async update(id, data) {
    let producto = this.products.find((product) => {
      if (product.id === id) {
        return product;
      }
      return false;
    });
    producto = data;
    return returnProducts(producto);
  }

  async delete(id) {
    this.products = this.products.filter((product) => product.id !== id);
  }

  async create(data) {
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
