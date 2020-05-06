const DbHelper = require('../dbhelper');

const courseCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('course.ncourse_id ', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('course.ncourse_id ', value));
    },
    courseEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('course.scourse_title ', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('course.status', status));
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => courseCriteria();
