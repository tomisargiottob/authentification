const fs = require('fs');
const { v4: uuid } = require('uuid');
const ProductDao = require('./productDAO');
const returnProducts = require('./productDTO');

let instance;

class ProductDaoFile extends ProductDao {
  constructor(logger) {
    super(logger);
    this.file = 'productos.json';
    try {
      this.products = fs.readFileSync(this.file, 'utf-8');
      this.products = JSON.parse(this.products);
    } catch (err) {
      this.products = [];
    }
  }

  async create(product) {
    if (!this.products) {
      this.products = [];
    }
    // eslint-disable-next-line no-param-reassign
    product.id = uuid();
    this.products.push(product);
    await fs.promises.writeFile(this.file, JSON.stringify(this.products, null, 2));
    const products = returnProducts(this.products);
    return products;
  }

  find(id) {
    const productFound = this.products.filter((product) => product.id === id);
    const products = returnProducts(productFound);
    return products;
  }

  getAll() {
    let products;
    try {
      this.products = fs.readFileSync(this.file, 'utf-8');
      this.products = JSON.parse(this.products);
      products = returnProducts(this.products);
    } catch (err) {
      this.log.warn('file not created yet, creating new one');
    }
    return products || [];
  }

  async delete(id) {
    try {
      this.products = this.fileInfo.filter((product) => product.id !== id);
      await fs.promises.writeFile(this.archivo, JSON.stringify(this.fileInfo, null, 2));
    } catch (err) {
      console.log(err);
    }
  }

  static getInstance(logger) {
    if (instance) {
      logger.info('devuelvo la instancia ya existente');
      return instance;
    }
    instance = new ProductDaoFile(logger);
    return instance;
  }
}

module.exports = ProductDaoFile;
