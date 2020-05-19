/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess } = require('@Library/middleware/auth');
const AdminDomain = require('@AdminDomain');


module.exports = {
  createLesson: AnonymousAccess(
    AdminDomain.Lesson().ValidateCreateLesson,
    AdminDomain.Lesson().HandleCreateLesson,
  ),
  updateLesson: AnonymousAccess(
    AdminDomain.Lesson().ValidateUpdateLesson,
    AdminDomain.Lesson().HandleUpdateLesson,
  ),
  deleteLesson: AnonymousAccess(
    AdminDomain.Lesson().ValidateDeleteLesson,
    AdminDomain.Lesson().HandleDeleteLesson,
  ),
};
