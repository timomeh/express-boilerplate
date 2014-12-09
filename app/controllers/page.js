/**
 * Controller: Page
 *
 * Here are your actions which are referenced in
 * the routes file.
 *
 * TMYK: You can access the Models directly in
 * the global variable Model.
 *
 * Example of a Model action:
 * Model.person.create({
 *   firstName: 'John',
 *   lastName: 'Doe'
 * }).exec(function(err, person) {
 *   ...
 * });
 *
 * Read the Waterline Docs on how to perform model queries.
 * https://github.com/balderdashy/waterline-docs
 */

exports.home = function(req, res) {
  res.render('index', { title: 'Express'});
};