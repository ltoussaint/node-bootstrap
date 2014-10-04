'use strict';

global.DOCUMENT_ROOT = __dirname;

var NodeBootstrap = require('node-bootstrap-core');

// Load core dependencies
require(DOCUMENT_ROOT + '/app/config/path.js');
var config = require(CONFIG_PATH + '/application.js');
var Application = require(APP_PATH + '/application.js');

// Load bootstrap
var bootstrap = require(APP_PATH + '/bootstrap.js');

var domain = require('domain').create();

domain.on('error', function domainError(error) {
  console.error(error);
});

domain.run(function domainRun() {
  // Initialize application
  var app = new Application();

  // Run bootstrap
  bootstrap(app);

  // Create server instance
  var server = new NodeBootstrap(config);
  // Start server
  server.start(app.requestListener.bind(app));
});



