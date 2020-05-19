const connection = require('../connection');

const lesson = connection.getDbContext('lesson');
module.exports = lesson;
