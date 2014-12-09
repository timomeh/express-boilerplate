/**
 * Route Bootstrapper
 */

var fs = require('fs')
  , express = require('express');
var router = express.Router();

var routes = require('../app/routes');



/**
 * Fetch all Controllers and store them
 */

var controllers = {};
var controller, name;
fs.readdirSync('./app/controllers').forEach(function(file) {
  if(~file.indexOf('.js')) {
    controller = require('../app/controllers/' + file);
    name = file.substring(0, file.length - 3);
    controllers[name] = controller;
  }
});



/**
 * Do the actual work of parsing the file, creating the
 * router and squish it into the express app.
 */

module.exports = function(cb, app) {

  // Parsing the routes file
  var method, path, ctrl, action;
  routes.forEach(function(route) {
    route = route.split(' ');
    method = route[0].toLowerCase(); path = route[1]; ctrl = route[2];
    ctrl = ctrl.split('.');
    action = ctrl[1]; ctrl = ctrl[0];

    router[method](path, controllers[ctrl][action]);
  });

  app.use(router);
  cb(null);
};