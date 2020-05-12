const DbHelper = require('../dbhelper');

const userCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('users.nuser_id', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('users.nuser_id', value));
    },
    emailEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('users.nuser_email', value));
    },
    userNameEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('users.nuser_name', value));
    },
    passwordEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('users.nuser_password', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('users.status', status));
    },
    roleEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('users.ndefault_pageview', status));
    },
    fullNameLike: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.CONSTANT(`CONCAT(users.nuser_firstname, ' ',users.nuser_lastname) LIKE '${value}'`));
    },
    emailLike: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('users.nuser_email', value));
    },
    userNameLike: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('users.nuser_name', value));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('users.nuser_id');
      } else {
        baseCriteria.addOrderByDesc('users.nuser_id');
      }
    },
    orderByFullName: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('nfull_name');
      } else {
        baseCriteria.addOrderByDesc('nfull_name');
      }
    },
    orderByEmail: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('users.nuser_email');
      } else {
        baseCriteria.addOrderByDesc('users.nuser_email');
      }
    },
    orderByUserName: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('users.nuser_name');
      } else {
        baseCriteria.addOrderByDesc('users.nuser_name');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => userCriteria();
