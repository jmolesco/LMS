
const AdminLogIn = require('../AdminLogIn');
const Category = require('../category');
const Course = require('../course');
const User = require('../user');
const Lesson = require('../lesson');

module.exports = {
  ...AdminLogIn.Resolvers,
  ...AdminLogIn.Mutations,
  ...Category.Resolvers,
  ...Category.Mutations,
  ...Course.Resolvers,
  ...Course.Mutations,
  ...User.Resolvers,
  ...User.Mutations,
  ...Lesson.Resolvers,
  ...Lesson.Mutations,
};
