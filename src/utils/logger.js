const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: { type: 'console' },
    error: { type: 'file', filename: 'warn.log'},
    error2: { type: 'file', filename: 'error.log' },
    loggerConsole: { type: 'logLevelFilter', appender: 'console', level: 'info' },
    loggerFile1: { type: 'logLevelFilter', appender: 'error', level: 'warn' },
    loggerFile2: { type: 'logLevelFilter', appender: 'error2', level: 'error' },
  },
  categories: {
    default: { appenders: ['loggerConsole'], level: 'all' },
    custom: { appenders: ['loggerConsole', 'loggerFile1', 'loggerFile2'], level: 'all' },
  },
});

const logger = log4js.getLogger('custom');

module.exports = logger;
