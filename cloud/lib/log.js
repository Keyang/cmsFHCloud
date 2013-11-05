/**
 * Logger component used throughout the application.
 */

var winston = require("winston");

var myLogger = new winston.Logger();
myLogger.err = myLogger.error;

module.exports = myLogger;

// Add console logger support
myLogger.add(winston.transports.Console, {
  "timestamp": true,
  "colorize": true
});

