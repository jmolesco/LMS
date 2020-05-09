/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const DBTransact = require('@Library/extensions/DBTransaction');
const path = require('path');
const fs = require('fs');

async function UploadImage(params) {
  const rootPath = path.dirname(require.main.filename);
  const imgPath = path.join(rootPath, 'uploads\\');

  if (!fs.existsSync(imgPath)) {
    fs.mkdirSync(imgPath);
  }
  const images = await params;
  const { filename, createReadStream } = await images.file;
  const newName = `${Date.now()}_${filename}`;
  const newPath = path.join(imgPath, newName);
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
async function InputValue(courseInput, isEdit = false) {
  const name = await UploadImage(courseInput.image);
  const schema = {
    scourse_title: courseInput.scourse_title,
    scourse_description: courseInput.scourse_description,
    scourse_photo: name,
    ncategory_id: courseInput.ncategory_id,
    ncreated_by: courseInput.ncreated_by,
  };
  if (isEdit === true) {
    schema.ncourse_id = courseInput.ncourse_id;
    schema.nupdated_by = courseInput.nupdated_by;
  }

  return schema;
}

module.exports = {
  HandleCreateCourse: DBTransact(async (connection, { courseInput }) => {
    const repo = repository(connection);
    //const rec = await UploadImage(courseInput.image);
    const data = await InputValue(courseInput);
    const newCourseStatus = await repo.CourseRepository.createCourse(data);
    return newCourseStatus;
  }),
  HandleUpdateCourse: DBTransact(async (connection, { courseUpdateInput }) => {
    const repo = repository(connection);
    const data = await InputValue(courseUpdateInput, true);
    const newCourseUpdateStatus = await repo.CourseRepository.updateCourse(data);
    return newCourseUpdateStatus;
  }),
  HandleDeleteCourse: DBTransact(async (connection, { courseDeleteInput }) => {
    const repo = repository(connection);
    const newCourseDeleteStatus = await repo.CourseRepository.deleteCourse({
      ncourse_id: courseDeleteInput.ncourse_id,
      status: 0,
    });
    return newCourseDeleteStatus;
  }),
};
