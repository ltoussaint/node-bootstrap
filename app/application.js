'use strict';

var CoreApplication = require(CORE_PATH + '/application');

/**
 * Extended application
 *
 * Allow to extend some method to define specific behaviors
 *
 * @returns {Application}
 * @constructor
 */
var Application = function () {

  //this.init = function () {};

  //this.onPageNotFound = function() {};

  /**
   * Here we redefine onError method to log errors using bunyan
   * @param request
   * @param response
   * @param error
   * @returns {Application}
   */
  this.onError = function (request, response, error) {
    //logger.error(error);
    response.writeHead(503);
    response.end('test');
    return this;
  };

  return this;


};

// Extend application from CoreApplication
Application.prototype = new CoreApplication();
Application.prototype.constructor = Application;

module.exports = Application;