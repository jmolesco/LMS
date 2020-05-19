const lesson = require('./lesson');
const lessonCriteria = require('./criteria');
const queries = require('./queries');

function LessonRepository(connection) {
  const lessonDB = lesson(connection);

  const inputValue = async (props, isEdit = false) => {
    const schema = {};

    if (isEdit === true) {
      if (props.id) {
        schema.id = props.id;
      }
    }
    if (props.title) {
      schema.title = props.title;
    }

    if (props.duration) {
      schema.duration = props.duration;
    }

    if (props.course_id) {
      schema.course_id = props.course_id;
    }

    if (props.attachment_type) {
      schema.attachment_type = props.attachment_type;
    }

    if (props.attachment) {
      schema.attachment = props.attachment;
    }

    if (props.summary) {
      schema.summary = props.summary;
    }

    return schema;
  };
  const createLesson = async (props) => {
    const lessonData = await inputValue(props);
    const result = await lessonDB.create(lessonData);
    return result.affectedRows > 0;
  };

  const updateLesson = async (props) => {
    const criteria = lessonCriteria();
    criteria.IdEqual(props.id);
    const lessonData = await inputValue(props, true);
    const result = await lessonDB.update(lessonData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteLesson = async (props) => {
    const criteria = lessonCriteria();
    criteria.IdEqual(props.id);
    const lessonData = {};
    lessonData.status = props.status;
    const result = await lessonDB.update(lessonData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  // Search and List
  const findLessonById = async (id) => {
    try {
      const criteria = lessonCriteria();
      criteria.IdEqual(id);
      const lessonData = await lessonDB.findOne(criteria.getBuildCriteria());
      return lessonData;
    } catch (err) {
      throw err;
    }
  };
  const findLessonByName = async (props, isEdit = false) => {
    try {
      const criteria = lessonCriteria();
      if (isEdit === true) criteria.notIdEqual(props.id);

      criteria.lessonEqual(props.title);
      const lessonData = await lessonDB.find(criteria.getBuildCriteria());
      return lessonData;
    } catch (err) {
      throw err;
    }
  };
  const getLessonList = async (crit = lessonCriteria()) => {
    try {
      const lessonData = await lessonDB.search(queries.lessonList, crit.getBuildCriteria());
      return lessonData;
    } catch (err) {
      throw err;
    }
  };
  const getLessonDetail = async (id) => {
    try {
      const lessonData = await lessonDB.findById(id, 'id');
      return lessonData;
    } catch (err) {
      throw err;
    }
  };
  const getLessonListCount = async (crit = lessonCriteria()) => {
    try {
      const result = await lessonDB.search(queries.lessonListCount, crit.getBuildCriteria());
      return result[0];
    } catch (err) {
      throw err;
    }
  };
  return {
    createLesson,
    updateLesson,
    deleteLesson,
    findLessonById,
    findLessonByName,
    getLessonList,
    getLessonListCount,
    getLessonDetail,
  };
}


module.exports = LessonRepository;
