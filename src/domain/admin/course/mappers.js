// eslint-disable-next-line import/no-extraneous-dependencies
const DB = require('@Library/repository');
// eslint-disable-next-line import/no-extraneous-dependencies
const courseCriteria = require('@Library/DB/course/criteria');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');
// eslint-disable-next-line import/no-extraneous-dependencies
const { SortType } = require('@Library/constants');

module.exports = {
  MapCourseList: async ({
    pager,
    filterStatus,
    searchKeyword,
    orderBy,
  }) => {
    const repository = DB();

    const criteria = courseCriteria();
    let newCriteria;
    if (filterStatus) {
      if (filterStatus.status === 1) {
        criteria.statusEqual(true);
      } else if (filterStatus.status === 2) {
        criteria.statusEqual(false);
      }
    }
    if (searchKeyword.keyword) {
      const criterias = courseCriteria();
      const criteria1 = courseCriteria();
      const criteria2 = courseCriteria();
      criteria1.categoryLike(searchKeyword.keyword);
      criteria2.titleLike(searchKeyword.keyword);
      const newCriterias = criterias.joinORCriteria([criteria1, criteria2]);
      newCriteria = criteria.joinANDCriteria([newCriterias]);
    }
    let noOrderBy = false;
    if (orderBy) {
      if (orderBy.orderKey === 1) { // ID
        if (orderBy.orderType === SortType.ASC) { // ASC
          criteria.orderByID(SortType.ASC);
        } else {
          criteria.orderByID(SortType.DESC);
        }
      } else if (orderBy.orderKey === 2) {
        if (orderBy.orderType === SortType.ASC) { // ASC
          criteria.orderByTitle(SortType.ASC);
        } else {
          criteria.orderByTitle(SortType.DESC);
        }
      } else if (orderBy.orderKey === 3) {
        if (orderBy.orderType === SortType.ASC) { // ASC
          criteria.orderByCategory(SortType.ASC);
        } else {
          criteria.orderByCategory(SortType.DESC);
        }
      } else {
        noOrderBy = true;
      }
    }


    const page = {
      page: pager.page,
      maxRecord: (config.ADMINMAXRECORDCOUNT_MISCELLANEOUS),
    };
    const CourseCount = await repository.CourseRepository.getCourseListCount(newCriteria || criteria);
    criteria.setPager(page);
    if (noOrderBy === true) criteria.orderByIntime();

    const result = await repository.CourseRepository.getCourseList(newCriteria || criteria);

    const mappedValues = result.map(repository.MapGetDataList);
    const list = { list: mappedValues };
    return repository.MapListWithPager(list, CourseCount.id, page);
  },
  MapCourseDetail: async ({ id }) => {
    const repository = DB();
    const criteria = courseCriteria();
    criteria.IdEqual(id);
    const result = await repository.CourseRepository.getCourseList(criteria);
    return repository.MapGetDataList(result[0]);
  },
};
