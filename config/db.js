/**
 * Database configuration
 *
 * Read the Waterline Expressjs example on how to setup
 * multiple connections.
 * https://github.com/balderdashy/waterline/blob/master/example/express/express-example.js
 *
 * Note:
 * The key 'adapter' with the value 'mongo' is referenced
 * in bootstrap/models.js
 */

module.exports = {
  localMongo: {
    adapter: 'mongo',
    host: 'localhost',
    port: 27017,
    database: 'express-boilerplate'
  }
}