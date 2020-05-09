const course = require('./course');
const courseCriteria = require('./criteria');
const queries = require('./queries');

function CourseRepository(connection) {
  const courseDB = course(connection);

  const inputValue = async (props, isEdit = false) => {
    const schema = {};

    if (isEdit === true) {
      if (props.ncourse_id) {
        schema.ncourse_id = props.ncourse_id;
      }
    }
    if (props.scourse_title) {
      schema.scourse_title = props.scourse_title;
    }
    if (props.scourse_description) {
      schema.scourse_description = props.scourse_description;
    }
    if (props.scourse_photo) {
      schema.scourse_photo = props.scourse_photo;
    }
    if (props.ncategory_id) {
      schema.ncategory_id = props.ncategory_id;
    }
    if (props.ncreated_by) {
      schema.ncreated_by = props.ncreated_by;
    }
    if (props.nupdated_by) {
      schema.nupdated_by = props.nupdated_by;
    }
    return schema;
  };
  const createCourse = async (props) => {
    const courseData = await inputValue(props);
    const result = await courseDB.create(courseData);
    return result.affectedRows > 0;
  };

  const updateCourse = async (props) => {
    const criteria = courseCriteria();
    criteria.IdEqual(props.ncourse_id);
    const courseData = await inputValue(props, true);
    const result = await courseDB.update(courseData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteCourse = async (props) => {
    const criteria = courseCriteria();
    criteria.IdEqual(props.ncourse_id);
    const courseData = {};
    courseData.status = 0;
    const result = await courseDB.update(courseData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  // Search and List
  const findCourseById = async (id) => {
    try {
      const criteria = courseCriteria();
      criteria.IdEqual(id);
      const courseData = await courseDB.findOne(criteria.getBuildCriteria());
      return courseData;
    } catch (err) {
      throw err;
    }
  };
  const findCourseByName = async (props, isEdit = false) => {
    try {
      const criteria = courseCriteria();
      if (isEdit === true) criteria.notIdEqual(props.ncourse_id);

      criteria.courseEqual(props.scourse_title);
      const courseData = await courseDB.find(criteria.getBuildCriteria());
      return courseData;
    } catch (err) {
      throw err;
    }
  };
  const buildCrit = (crit = courseCriteria()) => {
    let criterias = null;

    if (crit.getBuildCriteria) {
      criterias = crit.getBuildCriteria();
    } else {
      criterias = crit;
    }
    return criterias;
  };
  const getCourseList = async (crit = courseCriteria()) => {
    try {
      const criterias = buildCrit(crit);
      const courseData = await courseDB.search(queries.courseList, criterias);
      return courseData;
    } catch (err) {
      throw err;
    }
  };
  const getCourseDetail = async (id) => {
    try {
      const courseData = await courseDB.findById(id, 'ncourse_id');
      return courseData;
    } catch (err) {
      throw err;
    }
  };
  const getCourseListCount = async (crit = courseCriteria()) => {
    try {
      const criterias = buildCrit(crit);
      const result = await courseDB.search(queries.courseListCount, criterias);
      return result[0];
    } catch (err) {
      throw err;
    }
  };
  return {
    createCourse,
    updateCourse,
    deleteCourse,
    findCourseById,
    findCourseByName,
    getCourseList,
    getCourseListCount,
    getCourseDetail,
  };
}


module.exports = CourseRepository;
