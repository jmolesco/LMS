/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess } = require('@Library/middleware/auth');
const AdminDomain = require('@AdminDomain');

module.exports = {
  GetLessonList: AnonymousAccess(
    AdminDomain.Lesson().MapLessonList,
  ),
  GetLessonDetail: AnonymousAccess(
    AdminDomain.Lesson().MapLessonDetail,
  ),
};
