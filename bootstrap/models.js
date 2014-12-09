/**
 * Models Bootstrapper
 */

var fs = require('fs')
  , Waterline = require('waterline')
  , mongoAdapter = require('sails-mongo');
var dbconfig = require('../config/db');

var orm = new Waterline();



/**
 * Waterline ORM Configuration
 */

var config = {
  adapters: {
    'default': mongoAdapter,
    mongo: mongoAdapter
  },

  connections: dbconfig,

  defaults: {
    migrate: 'alter'
  }
};



/**
 * Bootstrapping the Models
 */

var model;

fs.readdirSync('./app/models').forEach(function(file) {
  if(~file.indexOf('.js')) {
    model = require('../app/models/' + file);
    orm.loadCollection(model); // load required model into ORM
  }
});



/**
 * Start waterline
 */

module.exports = function(cb, app) {
  orm.initialize(config, function(err, adapt) {
    if(err) throw err;

    global.Models = adapt.collections;
    // global.Connections = adapt.connections;

    cb(null);
  });
};