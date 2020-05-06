/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess } = require('@Library/middleware/auth');
const AdminDomain = require('@AdminDomain');

module.exports = {
  GetCourseList: AnonymousAccess(
    AdminDomain.Course().MapCourseList,
  ),
  GetCourseDetail: AnonymousAccess(
    AdminDomain.Course().MapCourseDetail,
  ),
};
