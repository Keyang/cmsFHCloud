/**
 * Simple interface to the CMS.
 */

module.exports = {
  getAppStructure: getAppStructure,
  getArticle: getArticle,
  getCmsUrl: getCmsUrl,
  init: init
};

var request = require('request'),
  utils = require('./utils.js'),
  log = require('./log.js'),
  env = require('./env.js'),
  url = require('url');


/**
 * Get the CMS URL being used.
 * @return {String}
 */

function getCmsUrl() {
  return url.resolve(env.get('CMS_URL'), env.get('CMS_PATH'));
}


/**
 * Get an article from the CMS
 * @param {Object}    params
 * @param {Function}  callback
 */

function getArticle(params, callback) {
  utils.verifyParams(['contentId'], params, function(err) {
    if (err) {
      return callback(err, null);
    }

    var url = getCmsUrl() + '/articles/load/' + params['contentId'];
    request.get(url, function(err, res, body) {
      if (err || (res && res.statusCode != 200)) {
        return utils.communicationError(err, res, body, callback);
      }

      return utils.sendResponse(body, callback);
    });
  });
}


/**
 * Get the structure of the application specified.
 * @param {Object}    params
 * @param {Function}  callback
 */

function getAppStructure(params, callback) {
  utils.verifyParams(['alias'], params, function(err) {
    if (err) {
      return callback(err, null);
    }

    var url = getCmsUrl() + '/apps/structure/' + params['alias'];
    request.get(url, function(err, res, body) {
      if (err || (res && res.statusCode != 200)) {
        return utils.communicationError(err, res, body, callback);
      }

      return utils.sendResponse(body, callback);
    })
  });
}