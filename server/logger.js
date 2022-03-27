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

module.exports = {
    'log': logger,
};
