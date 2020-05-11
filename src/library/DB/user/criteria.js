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
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => userCriteria();
