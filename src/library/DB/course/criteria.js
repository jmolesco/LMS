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
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('course.scourse_title', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('course.status', status));
    },
    titleLike: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('course.scourse_title', value));
    },
    categoryLike: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('category.scategory_name', value));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('course.ncourse_id');
      } else {
        baseCriteria.addOrderByDesc('course.ncourse_id');
      }
    },
    orderByCategory: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('category.scategory_name');
      } else {
        baseCriteria.addOrderByDesc('category.scategory_name');
      }
    },
    orderByTitle: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('course.scourse_title');
      } else {
        baseCriteria.addOrderByDesc('course.scourse_title');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => courseCriteria();
