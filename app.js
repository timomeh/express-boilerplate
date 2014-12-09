var express = require('express')
  , async = require('async');

var app = express();



/**
 * Bootstrap all server parts consecutively
 */
async.series([
  function(cb) {
    require('./bootstrap/models')(cb, app);
  },
  function(cb) {
    require('./bootstrap/middleware')(cb, app);
  },
  function(cb) {
    require('./bootstrap/routes')(cb, app);
  },
  function(cb) {
    require('./bootstrap/errorhandler')(cb, app);
  }
]);



module.exports = app;