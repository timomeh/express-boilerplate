/**
 * Middleware
 */

var path = require('path')
  , express = require('express')
  , swig = require('swig')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , cors = require('cors');



module.exports = function(cb, app) {
  app.use(cors());

  // view engine setup
  app.engine('html', swig.renderFile);
  app.set('views', path.join(__dirname, '..', 'app', 'views'));
  app.set('view engine', 'html');
  app.set('view cache', false);

  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  cb(null);
};