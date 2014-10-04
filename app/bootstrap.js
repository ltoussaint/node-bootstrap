'use strict';

var uriHook = require(CORE_HOOK_PATH + '/uri.js');
var exactPathRouter = require(CORE_ROUTER_PATH + '/exactPath.js');
var matchPathRouter = require(CORE_ROUTER_PATH + '/matchPath.js');

var jade = require('jade');

/**
 * Application bootstrap called when server is launching
 * @param app
 */
function bootstrap(app) {
  // Add router(s)
  app.addRouter(exactPathRouter);
  app.addRouter(matchPathRouter);

  //exactPathRouter.get('/', 'welcome');
  exactPathRouter.get('/improveJade', 'welcome::improveJade');
  exactPathRouter.get('/helloworld', 'welcome::helloWorld');
  exactPathRouter.get('/asynchelloworld', 'welcome::asyncHelloWorld');
  exactPathRouter.get('/testDb', 'welcome::testDb');

  exactPathRouter.get('/favicon.ico', function (request, response) {
    response.writeHead(200, {'Content-Type': 'image/x-icon'});
  });

  matchPathRouter.setDefaultAction('welcome');
  matchPathRouter.setDefaultMethod('index');

  // Add hook(s)
  app.addPreHook(uriHook);

  app.addPreHook(function (request, response) {
    response.renderFile = function (filePath, options) {
      response.write(
        jade.renderFile(filePath),
        'utf8'
      );
    };
  });
}

module.exports = bootstrap;