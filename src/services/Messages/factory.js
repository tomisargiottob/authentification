const minimist = require('minimist');
const MessageDaoFile = require('./messageDaoFile');
const MessageDaoMongo = require('./messageDaoMongo');
const MessageDaoMemory = require('./messageDaoMemory');
const logger = require('../../utils/logger');

const args = minimist(process.argv.slice(2));

const option = args.d;
if (option) {
  logger.info(`The DAO in ${option} option was selected`);
} else {
  logger.info('Default mode DAO in memory selected');
}
let dao;

class MessageDaoFactory {
  static getDao() {
    if (option === 'mongo') {
      dao = MessageDaoMongo.getInstance(logger);
    } else if (option === 'file') {
      dao = MessageDaoFile.getInstance(logger);
    } else {
      dao = MessageDaoMemory.getInstance(logger);
    }
    return dao;
  }
}

module.exports = MessageDaoFactory;
