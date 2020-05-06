/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess } = require('@Library/middleware/auth');
const AdminDomain = require('@AdminDomain');


module.exports = {
  createCourse: AnonymousAccess(
    AdminDomain.Course().ValidateCreateCourse,
    AdminDomain.Course().HandleCreateCourse,
  ),
  updateCourse: AnonymousAccess(
    AdminDomain.Course().ValidateUpdateCourse,
    AdminDomain.Course().HandleUpdateCourse,
  ),
  deleteCourse: AnonymousAccess(
    AdminDomain.Course().ValidateDeleteCourse,
    AdminDomain.Course().HandleDeleteCourse,
  ),
};
