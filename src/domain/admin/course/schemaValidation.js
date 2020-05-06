const validation = require('@Library/validation');
const config = require('@Library/config');

const CreateCourseSchema = (isEdit = false) => {
  const schema = {};
  if (isEdit === true) {
    schema.ncourse_id = [validation.CheckNumberValue(), validation.CheckRequired()];
    schema.nupdated_by = [validation.CheckNumberValue(), validation.CheckRequired()];
  }
  schema.scourse_title = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.scourse_description = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.scourse_photo = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.scourse_description = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.ncategory_id = [validation.CheckNumberValue(), validation.CheckRequired()];
  schema.ncreated_by = [validation.CheckNumberValue(), validation.CheckRequired()];

  return schema;
};
const DeleteCourseSchema = () => {
  const schema = {
    ncourse_id: [validation.CheckNumberValue()],
  };
  return schema;
};
module.exports = {
  CreateCourseSchema,
  DeleteCourseSchema,
};
