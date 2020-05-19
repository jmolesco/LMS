/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const DBTransact = require('@Library/extensions/DBTransaction');
const path = require('path');
const fs = require('fs');

async function UploadFile(params) {
  const rootPath = path.dirname(require.main.filename);
  const filePath = path.join(rootPath, 'uploads\\lessons\\');

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
  const images = await params;
  const { filename, createReadStream } = await images.file;
  const newName = `${Date.now()}_${filename}`;
  const newPath = path.join(filePath, newName);
  const stream = createReadStream();

  await Promise.resolve(new Promise((resolve, reject) => stream
    .pipe(fs.createWriteStream(newPath))
    .on('error', error => reject(error))
    .on('finish', () => {
      stream.destroy();
      resolve(newPath);
    })));
  return newName;
}
async function InputValue(lessonInput, isEdit = false) {
  const fileName = await UploadFile(lessonInput.file);
  const schema = {
    title: lessonInput.title,
    duration: lessonInput.duration,
    course_id: lessonInput.course_id,
    attachment_type: lessonInput.attachment_type,
    attachment: fileName,
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
