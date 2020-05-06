/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess } = require('@Library/middleware/auth');
const ClientDomain = require('@ClientDomain');

module.exports = {
  GetUserList: AnonymousAccess(
    ClientDomain.User().MapUserList,
  ),
  GetUserDetail: AnonymousAccess(
    ClientDomain.User().MapUserDetail,
  ),
};
