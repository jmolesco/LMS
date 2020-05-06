const connection = require('../connection');

const user = connection.getDbContext('users');
module.exports = user;
