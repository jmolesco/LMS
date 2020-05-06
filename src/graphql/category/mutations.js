/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess } = require('@Library/middleware/auth');
const AdminDomain = require('@AdminDomain');


module.exports = {
  createCategory: AnonymousAccess(
    AdminDomain.Category().ValidateCreateCategory,
    AdminDomain.Category().HandleCreateCategory,
  ),
  updateCategory: AnonymousAccess(
    AdminDomain.Category().ValidateUpdateCategory,
    AdminDomain.Category().HandleUpdateCategory,
  ),
  deleteCategory: AnonymousAccess(
    AdminDomain.Category().ValidateDeleteCategory,
    AdminDomain.Category().HandleDeleteCategory,
  ),
};
