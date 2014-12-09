/**
 * Model: Person
 *
 * Read the Waterline Docs on how to write a model.
 * https://github.com/balderdashy/waterline-docs
 *
 * Note:
 * The key 'connection' with the value 'localMongo'
 * is referenced in config/db.js.
 */

var Waterline = require('waterline');

var Person = Waterline.Collection.extend({
  connection: 'localMongo',
  identity: 'person',
  attributes: {
    firstName: 'string',
    lastName: 'string',
    age: 'integer',
    birthDate: 'date',
    emailAddress: 'email'
  }
});

module.exports = Person;