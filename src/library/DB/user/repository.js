const user = require('./user');
const userCriteria = require('./criteria');
const queries = require('./queries');
function UserRepository(connection) {
  const userDB = user(connection);

  const inputValue = async (props, isEdit = false) => {
    const schema = {};

    if (isEdit === true) {
      if (props.nuser_id) {
        schema.nuser_id = props.nuser_id;
      }
    }
    if (props.nuser_email) {
      schema.nuser_email = props.nuser_email;
    }
    if (props.nuser_name) {
      schema.nuser_name = props.nuser_name;
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
    if (props.ndefault_pageview) {
      schema.ndefault_pageview = props.ndefault_pageview;
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
    userData.status = props.status;
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
  const findUserByName = async (props, isUserName, isEdit = false) => {
    try {
      const criteria = userCriteria();
      if (isEdit === true) criteria.notIdEqual(props.nuser_id);

      if (isUserName === true) criteria.userNameEqual(props.nuser_name);
      else criteria.emailEqual(props.nuser_email);

      const userData = await userDB.find(criteria.getBuildCriteria());
      return userData;
    } catch (err) {
      throw err;
    }
  };
  const buildCrit = (crit = userCriteria()) => {
    let criterias = null;

    if (crit.getBuildCriteria) {
      criterias = crit.getBuildCriteria();
    } else {
      criterias = crit;
    }
    return criterias;
  };
  const getUserList = async (crit = userCriteria()) => {
    try {
      const criterias = buildCrit(crit);
      const userData = await userDB.search(queries.userList, criterias);
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
      const criterias = buildCrit(crit);
      const result = await userDB.search(queries.userListCount, criterias);
      return result[0];
    } catch (err) {
      throw err;
    }
  };
  const LogInUserAccount = async (crit = userCriteria()) => {
    try {
      const result = await userDB.find(crit.getBuildCriteria());
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
    LogInUserAccount,
  };
}


module.exports = UserRepository;
