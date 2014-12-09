/**
 * Route Bootstrapper
 */

var fs = require('fs')
  , express = require('express');
var router = express.Router();

var routes = require('../app/routes');



function parseRoute(route) {
  var method, path, ctrl, ctrls;
  route = route.split(' ');
  method = route[0].toLowerCase(); path = route[1];

  // Support for param
  if(method === 'param') {
    ctrl = route[2];
    ctrl = route[2].split('.');
    ctrl = controllers[ctrl[0]][ctrl[1]];
  } else {
    // Multiple functions can be chained,
    // therefor the array.
    ctrl = [];
    ctrls = route;
    ctrls.splice(0, 2);
    ctrls.forEach(function(fn) {
      fn = fn.split('.');
      ctrl.push(controllers[fn[0]][fn[1]]);
    });
  }

  return [method, path, ctrl];
}



/**
 * Support for regex params
 */

router.param(function(name, fn){
  if (fn instanceof RegExp) {
    return function(req, res, next, val){
      var captures;
      if (captures = fn.exec(String(val))) {
        req.params[name] = captures;
        next();
      } else {
        next('route');
      }
    }
  }
});

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
  var method, path, ctrl, ctrls, parsed;
  routes.forEach(function(route) {
    if(typeof route !== 'object') {
      // String Route
      parsed = parseRoute(route);
      method = parsed[0]; path = parsed[1]; ctrl = parsed[2];
    } else {
      // Object Route
      method = route.method.toLowerCase();
      path = route.path;
      ctrl = [];
      ctrls = route.exec;
      ctrls = ctrls.split(' ');
      ctrls.forEach(function(fn) {
        fn = fn.split('.');
        ctrl.push(controllers[fn[0]][fn[1]]);
      });
    }

    router[method](path, ctrl);
  });

  app.use(router);
  cb(null);
};