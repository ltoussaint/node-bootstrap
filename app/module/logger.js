'use strict';

var bunyan = require('bunyan');
var loggerConfig = {};

try {
  loggerConfig = require(CONFIG_PATH + '/bunyan.js');
} catch (Error) {
  loggerConfig = {
    name: 'Node bootstrap'
  };
}

// Simply create logger using bunyan and defined configuration
module.exports = bunyan.createLogger(loggerConfig);