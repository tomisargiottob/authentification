/* eslint-disable class-methods-use-this */
const ProductDao = require('./productDAO');
const ProductModel = require('../../models/product-model');
const returnProducts = require('./productDTO');

let instance;

class ProductDaoMongo extends ProductDao {
  async getAll(field, value) {
    const where = {};
    if (field && value) {
      where[field] = value;
    }
    const productosMongo = await ProductModel.find(where);
    const productos = returnProducts(productosMongo);
    return productos;
  }

  async find(id) {
    let producto;
    try {
      producto = await ProductModel.find({ id });
      if (producto.length > 0) {
        return returnProducts(producto[0]);
      }
    } catch (err) {
      throw new Error('Error looking for product');
    }
    throw new Error('Product not found');
  }

  async update(id, data) {
    // eslint-disable-next-line no-param-reassign
    data.id = id;
    if (!data.name || !data.price || !data.thumbnail) {
      throw new Error('Missing information, product should have name, price and thumbnail');
    }
    const producto = await ProductModel.findOneAndUpdate(id, data, { upsert: false });
    if (producto) {
      return returnProducts(data);
    }

    throw new Error('Product not found');
  }

  async delete(id) {
    const product = await ProductModel.findOneAndRemove(id);
    return product;
  }

  async create(data) {
    const producto = await ProductModel.create(data);
    return returnProducts(producto);
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
