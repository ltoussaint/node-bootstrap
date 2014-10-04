'use strict';

var Promise = require('promise');
var db = require(MODULE_PATH + '/database.js');
var jade = require('jade');

function Welcome(request, response) {

  this.index = function () {
    response.writeHeader(200, {"Content-Type": "text/html"});

    var urls = {
      '/improveJade': 'Improve Jade templating in actions',
      '/helloworld': 'Hello World',
      '/asynchelloworld': 'Asynchronous Hello World',
      '/testDb': 'Test your database'
    };

    response.write(
      jade.renderFile(TEMPLATE_PATH + '/welcome/index.jade', {urls: urls}),
      'utf8');
  };

  this.improveJade = function () {
    response.writeHeader(200, {"Content-Type": "text/html"});

    response.renderFile(TEMPLATE_PATH + '/welcome/improveJade.jade');
  };

  this.helloWorld = function () {
    response.write('Hello world');
  };

  this.asyncHelloWorld = function () {
    return Promise.resolve()
      .then(function () {
        response.setHeader('Content-Type', 'text/html; charset=UTF-8');
        response.setHeader('Transfer-Encoding', 'chunked');
        response.write('"Hello" will display first. "world" will display 1.5 seconds later');
        response.write('<br/>');
        response.write('Hello ');
      })
      .then(waitASecond.bind(this))
      .then(function () {
        response.write('world!');
      });
  };

  this.testDb = function () {
    return new Promise(function (resolve, reject) {
      response.write('Test db connection');
      try {
        db('yourbaseidentifier').query('SHOW TABLES', [], function (error, results) {
          if (error) {
            reject(error);
          } else {
            var l = results.length;
            if (l == 0) {
              response.write('Your database has no table!');
            } else {
              // Get key to get table name
              for (var firstKey in results[0]) {
                var key = firstKey;
                break;
              }
              response.write('You have ' + l + ' table' + (l > 1 ? 's' : '') + ' tables');
              response.write("\n\n");
              response.write('List :');
              for (var i = 0; i < l; i++) {
                response.write("\n");
                response.write(' - ' + results[i][key]);
              }
            }
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.onError = function (error) {
    response.write("\n");
    response.write(error.message);
    return true;
  };

  return this;
  function waitASecond() {
    return new Promise(function (resolve) {
      setTimeout(resolve, 1500);
    });
  }


}

module.exports = Welcome;