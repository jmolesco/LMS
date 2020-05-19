const DbHelper = require('../dbhelper');

const lessonCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('lesson.id', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('lesson.id', value));
    },
    lessonEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('lesson.title', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('lesson.status', status));
    },
    courseIDEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('lesson.course_id', status));
    },
    keywordLike: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('lesson.title', status));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('lesson.id');
      } else {
        baseCriteria.addOrderByDesc('lesson.id');
      }
    },
    orderByLesson: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('lesson.title');
      } else {
        baseCriteria.addOrderByDesc('lesson.title');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => lessonCriteria();
