/**
 * Routes
 *
 * This file defines all the routes for your express app.
 * Every item in the following array represents a single
 * route. A route item exists of the HTTP Method Verb,
 * the route and the controller with action to call.
 *
 * Schema:
 * 'METHOD ROUTE CONTROLLER.ACTION'
 *
 * Example:
 * A POST to /person should call the 'create' action
 * in the person.js controller. This would result in:
 * 
 * 'POST /person person.create'
 */

module.exports = [
  'GET / page.home'
];