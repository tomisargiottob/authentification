const db = require('../db/sqlite');

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
      } else {
        console.log('table products already exists');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    let products = [];
    try {
      products = await this.client.select().from('products');
    } catch (error) {
      console.log(error);
    }
    return products;
  }

  async createProduct(product) {
    try {
      await this.client.insert(product).from('products');
      console.log('producto insertado');
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Product;
