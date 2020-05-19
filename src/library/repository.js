/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */


const _CategoryRepository = require('./DB/category/repository');
const _CourseRepository = require('./DB/course/repository');
const _UserRepository = require('./DB/user/repository');
const _LessonRepository = require('./DB/lesson/repository');

const helpers = require('./helpers');
const config = require('./config');

function Repository(connection, _lang) {
  const CategoryRepository = _CategoryRepository(connection);
  const CourseRepository = _CourseRepository(connection);
  const UserRepository = _UserRepository(connection);
  const LessonRepository = _LessonRepository(connection);

  const MapListWithPager = (list, totalCount, pager, totalPerPage = 0) => ({
    ...list,
    pageInfo: pager && pager.page > 0 && pager.maxRecord > 0 ? {
      totalRecords: totalCount,
      totalPage: Math.ceil(totalCount / pager.maxRecord),
      currentPage: pager.page,
      totalPerPage,
    } : null,
  });
  const MapGetDataList = data => ({
    ...data,
    intime: helpers.formatDateTimeToStringPH(data.intime),
    uptime: data.uptime ? helpers.formatDateTimeToStringPH(data.uptime) : 'null',
  });
  const MapGetCourseDataList = data => ({
    ...data,
    intime: helpers.formatDateTimeToStringPH(data.intime),
    uptime: data.uptime ? helpers.formatDateTimeToStringPH(data.uptime) : 'null',
  });
  return {
    MapListWithPager,
    CategoryRepository,
    MapGetDataList,
    CourseRepository,
    UserRepository,
    MapGetCourseDataList,
    LessonRepository,
  };
}


module.exports = Repository;
