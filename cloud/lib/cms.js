/**
 * Simple interface to the CMS.
 */

module.exports = {
  getAppStructure: getAppStructure,
  getContentExtra: getContentExtra,
  getArticle: getArticle,
  getCmsUrl: getCmsUrl
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
  return env.get('CMS_URL');
}


/**
 * Generic CMS get request
 * @param {String}
 * @param {Callback}
 */
function doRequest(path, callback) {
  request.get(getCmsUrl() + path, function(err, res, body) {
    if (err || (res && res.statusCode != 200)) {
      return utils.communicationError(err, res, body, callback);
    }

    return utils.sendResponse(body, callback);
  }); 
}


/**
 * Get extra content types from CMS
 * @param {Object}
 * @param {Function}
 */
function getContentExtra(params, callback) {
  utils.verifyParams(['cat', 'type', 'template', 'extraId'], function(err) {
    if (err) {
      return callback(err, null);
    }

    var tpl = '/cms/articles/loadExtra/:cat/:type/:template/:extraId';
    var path = tpl
      .replace(':cat', params['cat'])
      .replace(':type', params['type'])
      .replace(':template', params['template'])
      .replace(':extraId', params['extraId']);

    return doRequest(path, callback);
  });
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

    var path = '/cms/articles/load/' + params['contentId'];
    return doRequest(path, callback);
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

    var path = '/cms/apps/structure/' + params['alias'];
    return doRequest(path, callback);
  });
}