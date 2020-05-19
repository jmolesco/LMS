
/** ***
 *
 * START HERE FOR POITORE

 *
 */


// SAMPLE DECLARATION
const AdminLogIn = require('./AdminLogIn');
const Category = require('./category');
const Course = require('./course');
const Lesson = require('./lesson');

module.exports = {
// SAMPLE DECLARATION
//  Rank: () => Rank,
  AdminLogIn: () => AdminLogIn,
  Category: () => Category,
  Course: () => Course,
  Lesson: () => Lesson,
};
