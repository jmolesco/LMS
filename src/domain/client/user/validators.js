/* eslint-disable import/no-extraneous-dependencies */
const validation = require('@Library/validation/');
//const messages = require('@Library/message-resources');
// const { defineErrors } = require('@Library/helpers');
//const repository = require('@Library/repository');
const { CreateUserSchema, DeleteUserSchema } = require('./schemaValidation');

module.exports = {
  ValidateCreateUser: async ({ userInput }) => {
    const errors = validation.SchemaValidator(CreateUserSchema())(userInput);
    // skip other validation when error occured on previous validation

    // const result = await repository().UserRepository.findUserByName(userInput);
    // if (result.length > 0) {
    //   errors.addFieldError('name', messages.LMS00002);
    // }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateUpdateUser: async ({ userUpdateInput }) => {
    const errors = validation.SchemaValidator(CreateUserSchema(true))(userUpdateInput);
    // skip other validation when error occured on previous validation
    // const result = await repository().UserRepository.findUserByName(userUpdateInput, true);
    // if (result.length > 0) {
    //   errors.addFieldError('name', messages.LMS00002);
    // }
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
};
