/* eslint-disable import/no-extraneous-dependencies */
const validation = require('@Library/validation/');
const messages = require('@Library/message-resources');
const repository = require('@Library/repository');
const userCriteria = require('@Library/DB/user/criteria');
const { CreateUserSchema, DeleteUserSchema, LogInUserSchema } = require('./schemaValidation');

module.exports = {
  ValidateCreateUser: async ({ userInput }) => {
    const errors = validation.SchemaValidator(CreateUserSchema())(userInput);
    // skip other validation when error occured on previous validation

    if (userInput.nuser_password !== userInput.cpass) {
      errors.addFieldError('confirmpass', messages.LMS00003);
    }
    const result = await repository().UserRepository.findUserByName(userInput, true);

    if (result.length > 0) {
      errors.addFieldError('nuser_name', messages.LMS00004);
    }
    const result1 = await repository().UserRepository.findUserByName(userInput, false);
    if (result1.length > 0) {
      errors.addFieldError('nuser_email', messages.LMS00005);
    }
    if (!userInput.image) {
      errors.addFieldError('nuser_picture', messages.E0000003);
    }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateUpdateUser: async ({ userUpdateInput }) => {
    const errors = validation.SchemaValidator(CreateUserSchema(true))(userUpdateInput);

    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateDeleteUser: async ({ userDeleteInput }) => {
    const errors = validation.SchemaValidator(DeleteUserSchema())(userDeleteInput);
    // skip other validation when error occured on previous validation
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateLogInUser: async ({ userLogInInput }) => {
    const errors = validation.SchemaValidator(LogInUserSchema())(userLogInInput);
    // skip other validation when error occured on previous validation
    const criteria = userCriteria();
    const { nuser_name, nuser_password } = userLogInInput;
    criteria.userNameEqual(nuser_name);
    criteria.passwordEqual(nuser_password);

    const record = await repository().UserRepository.LogInUserAccount(criteria);
    if (record.length === 0) {
      errors.addFieldError('account', messages.LMS00006);
    }
    if (errors.hasError()) {
      throw errors;
    }
  },
};
