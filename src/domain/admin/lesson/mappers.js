const DB = require('@Library/repository');
const lessconCriteria = require('@Library/DB/lesson/criteria');
const config = require('@Library/config');
const { SortType } = require('@Library/constants');

module.exports = {
  MapLessonList: async ({
    pager,
    filterStatus,
    filterCourse,
    searchKeyword,
    orderBy,
  }) => {
    const repository = DB();

    const criteria = lessconCriteria();

    if (filterStatus) {
      if (filterStatus.status === 1) {
        criteria.statusEqual(true);
      } else if (filterStatus.status === 2) {
        criteria.statusEqual(false);
      }
    }
    if (filterCourse.course_id) {
      criteria.courseIDEqual(filterCourse.course_id);
    }
    if (searchKeyword) {
      criteria.keywordLike(searchKeyword.keyword);
    }
    let noOrderBy = false;
    if (orderBy) {
      if (orderBy.orderKey === 1) { // ID
        if (orderBy.orderType === SortType.ASC) { // ASC
          criteria.orderByID(SortType.ASC);
        } else {
          criteria.orderByID(SortType.DESC);
        }
      } else if (orderBy.orderKey === 2) { // Title
        if (orderBy.orderType === SortType.ASC) { // ASC
          criteria.orderByLesson(SortType.ASC);
        } else {
          criteria.orderByLesson(SortType.DESC);
        }
      } else {
        noOrderBy = true;
      }
    }

    const page = {
      page: pager.page,
      maxRecord: config.ADMINMAXRECORDCOUNT_MISCELLANEOUS,
    };
    const LessonCount = await repository.LessonRepository.getLessonListCount(criteria);
    criteria.setPager(page);
    if (noOrderBy === true) criteria.orderByIntime();

    const result = await repository.LessonRepository.getLessonList(criteria);

    const mappedValues = result.map(repository.MapGetDataList);
    const list = { list: mappedValues };
    return repository.MapListWithPager(list, LessonCount.id, page);
  },
  MapLessonDetail: async ({ id }) => {
    const repository = DB();
    const result = await repository.LessonRepository.getLessonDetail(id);
    return repository.MapGetDataList(result);
  },
};
