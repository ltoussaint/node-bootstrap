'use strict';

/**
 * process.env.NODE_ENV is defined in the nginx configuration
 *
 * process.env.APP_LOG_PATH is defined in the nginx configuration
 * But you can use what you want to define your log path
 */

var config = {
  name: 'Node bootstrap : ' + process.env.NODE_ENV,
  streams: [
    {
      level: 'error',
      path: process.env.APP_LOG_PATH + '/error.log'
    },
    {
      level: 'error',
      stream: process.stdout
    }
  ]
};

switch (process.env.NODE_ENV) {

  case 'production':
    config.level = 'error';
    break;
  case 'staging':
    config.streams[1] = {
      level: 'info',
      path: process.env.APP_LOG_PATH + '/info.log'
    };
    break;
  case 'development':
  default :
    config.src = true; // Display file, line and function of the log
    config.streams[1] = {
      level: 'trace',
      path: process.env.APP_LOG_PATH + '/trace.log'
    };
    break;
}

module.exports = config;