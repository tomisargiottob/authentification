const db = require('../db/sqlite');
const logger = require('../utils/logger');

class Product {
  constructor() {
    this.client = db.client;
    this.createTable();
  }

  async createTable() {
    try {
      const exists = await this.client.schema.hasTable('products');
      if (!exists) {
        await this.client.schema.createTable('products', (table) => {
          table.increments('id').primary().notNullable();
          table.string('name').notNullable();
          table.integer('price').notNullable();
          table.string('thumbnail');
        });
      }
    } catch (err) {
      logger.error(err);
    }
  }

  async getAll() {
    let products = [];
    try {
      products = await this.client.select().from('products');
    } catch (error) {
      logger.error(error);
    }
    return products;
  }

  async createProduct(product) {
    try {
      await this.client.insert(product).from('products');
      logger.info('producto insertado');
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = Product;
