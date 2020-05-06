// eslint-disable-next-line import/no-extraneous-dependencies
const validation = require('@Library/validation');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');

const CreateCategorySchema = (isEdit = false) => {
  const schema = {};
  if (isEdit === true) {
    schema.ncategory_id = [validation.CheckNumberValue(), validation.CheckRequired()];
  }
  schema.scategory_name = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  return schema;
};
const DeleteCategorySchema = () => {
  const schema = {
    ncategory_id: [validation.CheckNumberValue()],
  };
  return schema;
};
module.exports = {
  CreateCategorySchema,
  DeleteCategorySchema,
};
