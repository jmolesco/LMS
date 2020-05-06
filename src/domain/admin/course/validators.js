/* eslint-disable import/no-extraneous-dependencies */
const validation = require('@Library/validation/');
const messages = require('@Library/message-resources');
// const { defineErrors } = require('@Library/helpers');
const repository = require('@Library/repository');
const { CreateCourseSchema, DeleteCourseSchema } = require('./schemaValidation');

module.exports = {
  ValidateCreateCourse: async ({ courseInput }) => {
    const errors = validation.SchemaValidator(CreateCourseSchema())(courseInput);
    // skip other validation when error occured on previous validation

    const result = await repository().CourseRepository.findCourseByName(courseInput);
    if (result.length > 0) {
      errors.addFieldError('title', messages.LMS00002);
    }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateUpdateCourse: async ({ courseUpdateInput }) => {
    const errors = validation.SchemaValidator(CreateCourseSchema(true))(courseUpdateInput);
    // skip other validation when error occured on previous validation
    const result = await repository().CourseRepository.findCourseByName(courseUpdateInput, true);
    if (result.length > 0) {
      errors.addFieldError('title', messages.LMS00002);
    }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateDeleteCourse: async ({ courseDeleteInput }) => {
    const errors = validation.SchemaValidator(DeleteCourseSchema())(courseDeleteInput);
    // skip other validation when error occured on previous validation
    if (errors.hasError()) {
      throw errors;
    }
  },
};
