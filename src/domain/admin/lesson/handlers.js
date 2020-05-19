/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const DBTransact = require('@Library/extensions/DBTransaction');

async function InputValue(lessonInput, isEdit = false) {
  const schema = {
    title: lessonInput.title,
    duration: lessonInput.duration,
    course_id: lessonInput.course_id,
    attachment_type: lessonInput.attachment_type,
    attachment: lessonInput.attachment,
    summary: lessonInput.summary,
  };
  if (isEdit === true) {
    schema.id = lessonInput.id;
  }

  return schema;
}
module.exports = {
  HandleCreateLesson: DBTransact(async (connection, { lessonInput }) => {
    const repo = repository(connection);
    const data = await InputValue(lessonInput);
    const newLessonStatus = await repo.LessonRepository.createLesson(data);
    return newLessonStatus;
  }),
  HandleUpdateLesson: DBTransact(async (connection, { lessonUpdateInput }) => {
    const repo = repository(connection);
    const data = await InputValue(lessonUpdateInput);
    const newLessonUpdateStatus = await repo.LessonRepository.updateLesson(data);
    return newLessonUpdateStatus;
  }),
  HandleDeleteLesson: DBTransact(async (connection, { lessonDeleteInput }) => {
    const repo = repository(connection);
    const newLessonDeleteStatus = await repo.LessonRepository.deleteLesson({
      id: lessonDeleteInput.id,
      status: lessonDeleteInput.status,
    });
    return newLessonDeleteStatus;
  }),
};
