/* eslint-disable class-methods-use-this */
const ProductDao = require('./productDAO');
const ProductModel = require('../models/productos-model');
const returnProducts = require('./productDTO');

let instance;

class ProductDaoMongo extends ProductDao {
  async getAll() {
    const productosMongo = await ProductModel.find();
    const productos = returnProducts(productosMongo);
    return productos;
  }

  async find(id) {
    const producto = await ProductModel.findById(id);
    const product = {
      name: producto.name,
      price: producto.price,
      thumbnail: producto.thumbnail,
    };
    return product;
  }

  async update(id, data) {
    const producto = await ProductModel.findOneAndUpdate(id, data);
    const product = {
      name: producto.name,
      price: producto.price,
      thumbnail: producto.thumbnail,
    };
    return product;
  }

  async delete(id) {
    await ProductModel.findOneAndRemove(id);
  }

  async create(data) {
    const producto = await ProductModel.create(data);
    const product = {
      name: producto.name,
      price: producto.price,
      thumbnail: producto.thumbnail,
    };
    return product;
  }

  static getInstance(logger) {
    if (instance) {
      logger.info('devuelvo la instancia ya existente');
      return instance;
    }
    instance = new ProductDaoMongo(logger);
    return instance;
  }
}

module.exports = ProductDaoMongo;
