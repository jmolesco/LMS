const user = require('./user');
const userCriteria = require('./criteria');

function UserRepository(connection) {
  const userDB = user(connection);

  const inputValue = async (props, isEdit = false) => {
    const schema = {};

    if (isEdit === true) {
      if (props.nuser_id) {
        schema.nuser_id = props.nuser_id;
      }
    }
    if (props.suser_name) {
      schema.suser_name = props.suser_name;
    }
    if (props.nuser_email) {
      schema.nuser_email = props.nuser_email;
    }
    if (props.suser_name) {
      schema.suser_name = props.suser_name;
    }
    if (props.nuser_firstname) {
      schema.nuser_firstname = props.nuser_firstname;
    }
    if (props.nuser_suffixname) {
      schema.nuser_suffixname = props.nuser_suffixname;
    }
    if (props.nuser_lastname) {
      schema.nuser_lastname = props.nuser_lastname;
    }
    if (props.nuser_middlename) {
      schema.nuser_middlename = props.nuser_middlename;
    }
    if (props.nuser_picture) {
      schema.nuser_picture = props.nuser_picture;
    }
    if (props.nuser_password) {
      schema.nuser_password = props.nuser_password;
    }
    return schema;
  };
  const createUser = async (props) => {
    const userData = await inputValue(props);
    const result = await userDB.create(userData);
    return result.affectedRows > 0;
  };

  const updateUser = async (props) => {
    const criteria = userCriteria();
    criteria.IdEqual(props.nuser_id);
    const userData = await inputValue(props, true);
    const result = await userDB.update(userData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteUser = async (props) => {
    const criteria = userCriteria();
    criteria.IdEqual(props.nuser_id);
    const userData = {};
    userData.status = 0;
    const result = await userDB.update(userData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  // Search and List
  const findUserById = async (id) => {
    try {
      const criteria = userCriteria();
      criteria.IdEqual(id);
      const userData = await userDB.findOne(criteria.getBuildCriteria());
      return userData;
    } catch (err) {
      throw err;
    }
  };
  const findUserByName = async (props, isEdit = false) => {
    try {
      const criteria = userCriteria();
      if (isEdit === true) criteria.notIdEqual(props.nuser_id);

      criteria.userNameEqual(props.suser_name);
      const userData = await userDB.find(criteria.getBuildCriteria());
      return userData;
    } catch (err) {
      throw err;
    }
  };
  const getUserList = async (crit = userCriteria()) => {
    try {
      const userData = await userDB.find(crit.getBuildCriteria());
      return userData;
    } catch (err) {
      throw err;
    }
  };
  const getUserDetail = async (id) => {
    try {
      const userData = await userDB.findById(id, 'nuser_id');
      return userData;
    } catch (err) {
      throw err;
    }
  };
  const getUserListCount = async (crit = userCriteria()) => {
    try {
      const result = await userDB.getCount(crit.getBuildCriteria(), 'nuser_id');
      return result;
    } catch (err) {
      throw err;
    }
  };
  return {
    createUser,
    updateUser,
    deleteUser,
    findUserById,
    findUserByName,
    getUserList,
    getUserListCount,
    getUserDetail,
  };
}


module.exports = UserRepository;
