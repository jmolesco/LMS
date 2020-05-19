// eslint-disable-next-line import/no-extraneous-dependencies
const validation = require('@Library/validation');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');

const CreateLessonSchema = (isEdit = false) => {
  const schema = {};
  if (isEdit === true) {
    schema.id = [validation.CheckNumberValue(), validation.CheckRequired()];
  }
  schema.title = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.summary = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.duration = [validation.CheckNumberValue(), validation.CheckRequired()];
  schema.course_id = [validation.CheckNumberValue(), validation.CheckRequired()];
  schema.attachment_type = [validation.CheckNumberValue(), validation.CheckRequired()];
  return schema;
};
const DeleteLessonSchema = () => {
  const schema = {
    id: [validation.CheckNumberValue()],
  };
  return schema;
};
module.exports = {
  CreateLessonSchema,
  DeleteLessonSchema,
};
