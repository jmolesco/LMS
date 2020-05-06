/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess } = require('@Library/middleware/auth');
const AdminDomain = require('@AdminDomain');

module.exports = {
  GetCategoryList: AnonymousAccess(
    AdminDomain.Category().MapCategoryList,
  ),
  GetCategoryDetail: AnonymousAccess(
    AdminDomain.Category().MapCategoryDetail,
  ),
};
