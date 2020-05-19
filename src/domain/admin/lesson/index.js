const handlers = require('./handlers');
const mappers = require('./mappers');
const validators = require('./validators');

module.exports = {
  ...handlers,
  ...mappers,
  ...validators,
};
