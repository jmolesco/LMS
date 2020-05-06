const connection = require('../connection');

const course = connection.getDbContext('course');
module.exports = course;
