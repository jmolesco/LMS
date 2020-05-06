/* esluserInput.-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const repository = require('@Library/repository');
// eslint-disable-next-line import/no-extraneous-dependencies
const DBTransact = require('@Library/extensions/DBTransaction');

async function InputValue(userInput, isEdit = false) {
  const schema = {
    nuser_name: userInput.nuser_name,
    nuser_email: userInput.nuser_email,
    nuser_firstname: userInput.nuser_firstname,
    nuser_suffixname: userInput.nuser_suffixname,
    nuser_lastname: userInput.nuser_lastname,
    nuser_middlename: userInput.nuser_middlename,
    nuser_picture: userInput.nuser_picture,
    nuser_password: userInput.nuser_password,
  };
  if (isEdit === true) {
    schema.nuser_id = userInput.nuser_id;
    schema.nuser_group = userInput.nuser_group;
    schema.nuser_phone1 = userInput.nuser_phone1;
    schema.nuser_phone2 = userInput.nuser_phone2;
    schema.tuser_birthdate = userInput.tuser_birthdate;
    schema.suser_birthplace = userInput.suser_birthplace;
    schema.saddress_line_1 = userInput.saddress_line_1;
    schema.saddress_line_2 = userInput.saddress_line_2;
    schema.scity = userInput.scity;
    schema.sstate = userInput.sstate;
    schema.suser_country = userInput.suser_country;
    schema.nnationality_id = userInput.nnationality_id;
    schema.nuser_verified = userInput.nuser_verified;
    schema.nuser_gender = userInput.nuser_gender;
    schema.sguardian_lastname = userInput.sguardian_lastname;
    schema.sguardian_middlename = userInput.sguardian_middlename;
    schema.sguardian_firstname = userInput.sguardian_firstname;
    schema.scontact_emergency = userInput.scontact_emergency;
    schema.slast_school_attended = userInput.slast_school_attended;
  }
  return schema;
}

module.exports = {
  HandleCreateUser: DBTransact(async (connection, { userInput }) => {
    const repo = repository(connection);
    const data = await InputValue(userInput);
    const newUserStatus = await repo.UserRepository.createUser(data);
    return newUserStatus;
  }),
  HandleUpdateUser: DBTransact(async (connection, { userUpdateInput }) => {
    const repo = repository(connection);
    const data = await InputValue(userUpdateInput);
    const newUserUpdateStatus = await repo.UserRepository.updateUser(data);
    return newUserUpdateStatus;
  }),
  HandleDeleteUser: DBTransact(async (connection, { userDeleteInput }) => {
    const repo = repository(connection);
    const newUserDeleteStatus = await repo.UserRepository.deleteUser({
      nuser_id: userDeleteInput.nuser_id,
      status: 0,
    });
    return newUserDeleteStatus;
  }),
};
