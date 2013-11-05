/**
 * Interface to environment variables.
 * Also controls app startup.
 */

module.exports = {
  init: init,
  get: get
};

var log = require('./log.js'),
  request = require('request');

// These should be set through fhc or the App Studio
var required_vars = {
  "CMS_URL": "http://cms.keyangxiang.com",
  "CMS_PATH": "/cms",
  "FH_ENV": "dev" // Allow use of FH_ENV for local development without editing bash profile
};


function init() {
  log.info('Checking environment...');

  // Check env vars and provide warning where not set
  for (var key in required_vars) {
    if (!process.env[key]) {
      log.warn(key + ' environment var not set. Using default: ' + required_vars[key]);
    }
  }

  log.info('Environment check complete!');
}


/**
 * Reads the environment variable or returns the default
 * @param {String} variableName
 */

function get(variableName) {
  return process.env[variableName] ? process.env[variableName] : this[variableName] ? this[variableName] : required_vars[variableName];
}