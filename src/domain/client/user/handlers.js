/* esluserInput.-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const repository = require('@Library/repository');
// eslint-disable-next-line import/no-extraneous-dependencies
const DBTransact = require('@Library/extensions/DBTransaction');
const path = require('path');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const userCriteria = require('@Library/DB/user/criteria');
const helpers = require('@Library/helpers');

async function UploadImage(params) {
  const rootPath = path.dirname(require.main.filename);
  const imgPath = path.join(rootPath, 'uploads\\profile\\');

  if (!fs.existsSync(imgPath)) {
    fs.mkdirSync(imgPath);
  }
  const images = await params;
  const { filename, createReadStream } = await images.file;
  const newName = `${Date.now()}_${filename}`;
  const newPath = path.join(imgPath, newName);
  const stream = createReadStream();

  await Promise.resolve(new Promise((resolve, reject) => stream
    .pipe(fs.createWriteStream(newPath))
    .on('error', error => reject(error))
    .on('finish', () => {
      stream.destroy();
      resolve(newPath);
    })));
  return newName;
}

async function InputValue(userInput, isEdit = false) {
  const name = await UploadImage(userInput.image);
  const schema = {
    nuser_name: userInput.nuser_name,
    nuser_email: userInput.nuser_email,
    nuser_firstname: userInput.nuser_firstname,
    nuser_lastname: userInput.nuser_lastname,
    nuser_picture: name,
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
    schema.nuser_suffixname = userInput.nuser_suffixname;
    schema.nuser_middlename = userInput.nuser_middlename;
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
  HandleLogInUser: DBTransact(async (connection, { userLogInInput }) => {
    const repo = repository(connection);
    const criteria = userCriteria();
    const { nuser_name, nuser_password } = userLogInInput;
    criteria.userNameEqual(nuser_name);
    criteria.passwordEqual(nuser_password);

    const newUserDeleteStatus = await repo.UserRepository.LogInUserAccount(criteria);
    const data = newUserDeleteStatus[0];

    const token = helpers.createToken({
      nuser_name,
    });
    const dataInfo = {
      token: token.data,
      fullName: `${data.nuser_firstname} ${data.nuser_lastname}`,
      userName: data.nuser_name,
      id: data.nuser_id,
      tokenExpiration: token.tokenExpiration,
      nuser_group: data.nuser_group,
    };
    return dataInfo;
  }),
};
