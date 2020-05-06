// eslint-disable-next-line import/no-extraneous-dependencies
const DB = require('@Library/repository');
// eslint-disable-next-line import/no-extraneous-dependencies
const courseCriteria = require('@Library/DB/course/criteria');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');


module.exports = {
  MapCourseList: async ({ pager }) => {
    const repository = DB();

    const criteria = courseCriteria();
    criteria.statusEqual(true);

    const page = {
      page: pager.page,
      maxRecord: (config.ADMINMAXRECORDCOUNT_MISCELLANEOUS * pager.page),
    };
    const CourseCount = await repository.CourseRepository.getCourseListCount(criteria);
    criteria.setPager(page);
    criteria.orderByIntime();
    const result = await repository.CourseRepository.getCourseList(criteria);

    const mappedValues = result.map(repository.MapGetDataList);
    const list = { list: mappedValues };
    return repository.MapListWithPager(list, CourseCount, page);
  },
  MapCourseDetail: async ({ id }) => {
    const repository = DB();
    const criteria = courseCriteria();
    criteria.IdEqual(id);
    const result = await repository.CourseRepository.getCourseList(criteria);
    return repository.MapGetDataList(result[0]);
  },
};
