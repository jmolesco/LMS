/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess } = require('@Library/middleware/auth');
const ClientDomain = require('@ClientDomain');


module.exports = {
  createUser: AnonymousAccess(
    ClientDomain.User().ValidateCreateUser,
    ClientDomain.User().HandleCreateUser,
  ),
  updateUser: AnonymousAccess(
    ClientDomain.User().ValidateUpdateUser,
    ClientDomain.User().HandleUpdateUser,
  ),
  deleteUser: AnonymousAccess(
    ClientDomain.User().ValidateDeleteUser,
    ClientDomain.User().HandleDeleteUser,
  ),
};
