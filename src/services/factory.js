const minimist = require('minimist');
const ProductDaoFile = require('./productDaoFile');
const ProductDaoMongo = require('./productDaoMongo');
const ProductDaoMemory = require('./productDaoMemory');
const logger = require('../utils/logger');

const args = minimist(process.argv.slice(2));

const option = args.d;
logger.info(`Se ha seleccionado la opcion ${option} de DAO`);
let dao;

class ProductDaoFactory {
  static getDao() {
    if (option === 'mongo') {
      dao = ProductDaoMongo.getInstance(logger);
    } else if (option === 'file') {
      dao = ProductDaoFile.getInstance(logger);
    } else {
      dao = ProductDaoMemory.getInstance(logger);
    }
    return dao;
  }
}

module.exports = ProductDaoFactory;
