/* main.js
 * All calls here are publicly exposed as REST API endpoints.
 * - all parameters must be passed in a single JSON paramater.
 * - the return 'callback' method signature is 'callback (error, data)', where 'data' is a JSON object.
 */

var env = require('./lib/env'),
  log = require('./lib/log'),
  cms = require('./lib/cms');

// Check env
env.init();

// Public calls
exports.getCmsArticle = cms.getCmsArticle;
exports.getAppStructure = cms.getAppStructure;