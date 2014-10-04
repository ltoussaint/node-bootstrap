'use strict';

var openedConnections = {};
var databaseConfigurations = require(CONFIG_PATH + "/database.js");
var mysql = require("mysql");
var logger = require(MODULE_PATH + '/logger.js');

function Database(name) {
  if (openedConnections[name]) {
    return openedConnections[name];
  }

  if (!databaseConfigurations[name]) {
    logger.error('Configuration not found in "config/database.js" for database ' + name);
    throw new Error('Configuration not found in "config/database.js" for database ' + name);
  }

  openedConnections[name] = mysql.createConnection(databaseConfigurations[name]);
  return openedConnections[name];
}

module.exports = Database;