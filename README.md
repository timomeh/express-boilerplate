expressjs Boilerplate
========

This is a boilerplate for [expressjs](https://github.com/strongloop/express), using the [Waterline ORM](https://github.com/balderdashy/waterline) with the [MongoDB](http://www.mongodb.org/) [adapter](https://github.com/balderdashy/sails-mongo).

Besides the MVC-_ish_ pattern the boilerplate **preloads your models**, **saves them in a global variable** and **maps your routes** based on a simple text format.

Why?
----

I was tired of constantly refactoring my express apps. I wanted a simple less-effort boilerplate without having express wrapped in a third party module. In my opinion expressjs is an important and regular-developed module, and I don't want to rely on a third party to update to the newest expressjs version.

This boilerplate should make me happy. That's why I use my preferred modules, like swig as template engine and MongoDB as database. I chose Waterline instead of mongoose to make it more scalable.

All the bootstrapping functions are easy to understand and modify.

Install
-------

1. Clone or download this repository
2. `cd` into the boilerplate
3. run `npm install`
4. start `mongod`
5. run `npm start`
6. visit `http://localhost:3000`

Features
--------

* Preload all your models
* Save your models in the global `Models`
* Router in one simple file
* Default swig template engine
* Error handling
* Scalable

### Structure

The MVC part is in `/app`. Here are the _controllers_, _models_, _views_ and _routes_ in the corresponding files or folders.  
Magic (not really magical) happens in `/bootstrap`. The bootstrap functions are called in `app.js`.

### Models

Make one file per model. Visit the [Waterline Model Documentation on how to define a model](https://github.com/balderdashy/waterline-docs/blob/master/models.md).

A simple model for a person could look like this:

```javascript
var Waterline = require('waterline');

var Person = Waterline.Collection.extend({
  connection: 'localMongo',
  identity: 'person',
  attributes: {
    firstName: 'string',
    lastName: 'string'
  }
});

module.exports = Person;
```

### Controllers

Make one file per controller. Each controller has actions like `get`, `list`, `create`, `someAction`, … . Every action is a `exports.someAction`. You can access `req`, `res` and `next` as you normally would. Also you can access the Model without having to require it.

A simple create action in the controller `person.js` could look like this:

```javascript
exports.create = function(req, res, next) {
  Model.person.create({
    firstName: 'John',
    lastName: 'Doe'
  }).exec(function(err, person) {
    if(err) return next(err);
    var fullName = person.firstName + ' ' + person.lastName;
    res.render('user', { name: fullName });
  });
};
```

### Router

The Router is a single `router.js` file. It's an array with route definitions for every item. One item in the array has following schema:  
`'METHOD route controller.action'`

As an example we create two routes. One route for displaying the home page and one route for creating a new person.

```javascript
module.exports = [
  'GET / page.home',
  'POST /person person.create'
];
```

### Config

In `/config/db.js` you will see a small database connection configuration. This refers to [this part](https://github.com/balderdashy/waterline/blob/master/example/express/express-example.js#L39) of the Waterline express example.

Coming soon
-----------

* Better support for `express.Router()`'s great features
