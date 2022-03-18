const winston = require('winston');

/**
* A logger that is used for logging back-end/server components.
*/

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'server/logging/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'server/logging/combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
/*if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}*/

module.exports = {
    'log': logger,
};
  
/*
  // ***************
  // Allows for parameter-based logging
  // ***************
  
  logger.log('info', 'Pass a message and this works');
  
  
  // ***************
  // Allows for string interpolation
  // ***************
  
  // info: test message my string {}
  logger.log('info', 'test message');
  */