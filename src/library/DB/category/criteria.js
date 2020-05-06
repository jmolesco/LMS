const DbHelper = require('../dbhelper');

const categoryCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('category.ncategory_id', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('category.ncategory_id', value));
    },
    categoryEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('category.scategory_name', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('category.status', status));
    },
    keywordLike: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('category.scategory_name', status));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('category.ncategory_id');
      } else {
        baseCriteria.addOrderByDesc('category.ncategory_id');
      }
    },
    orderByCategory: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('category.scategory_name');
      } else {
        baseCriteria.addOrderByDesc('category.scategory_name');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => categoryCriteria();
