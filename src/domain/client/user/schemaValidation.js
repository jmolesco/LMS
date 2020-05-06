// eslint-disable-next-line import/no-extraneous-dependencies
const validation = require('@Library/validation');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');

const CreateUserSchema = (isEdit = false) => {
  const schema = {};
  if (isEdit === true) {
    schema.nuser_id = [validation.CheckNumberValue(), validation.CheckRequired()];
    schema.nuser_group = [validation.CheckNumberValue(), validation.CheckRequired()];
    schema.nuser_phone1 = [validation.CheckNumberValue(), validation.CheckRequired()];
    schema.nuser_phone2 = [validation.CheckNumberValue(), validation.CheckRequired()];
    schema.tuser_birthdate = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
    schema.suser_birthplace = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
    schema.saddress_line_1 = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
    schema.saddress_line_2 = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
    schema.scity = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
    schema.sstate = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
    schema.suser_country = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
    schema.nnationality_id = [validation.CheckNumberValue(), validation.CheckRequired()];
    schema.nuser_verified = [validation.CheckNumberValue(), validation.CheckRequired()];
    schema.nuser_gender = [validation.CheckNumberValue(), validation.CheckRequired()];
    schema.sguardian_lastname = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
    schema.sguardian_middlename = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
    schema.sguardian_firstname = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
    schema.scontact_emergency = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
    schema.slast_school_attended = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  }
  schema.nuser_name = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.nuser_email = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.nuser_firstname = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.nuser_lastname = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.nuser_middlename = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.nuser_suffixname = [validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.nuser_picture = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.nuser_password = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  return schema;
};
const DeleteUserSchema = () => {
  const schema = {
    nuser_id: [validation.CheckNumberValue(), validation.CheckRequired()],
  };
  return schema;
};
module.exports = {
  CreateUserSchema,
  DeleteUserSchema,
};
