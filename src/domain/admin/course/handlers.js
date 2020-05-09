/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const DBTransact = require('@Library/extensions/DBTransaction');

async function InputValue(courseInput, isEdit = false) {
  const schema = {
    scourse_title: courseInput.scourse_title,
    scourse_description: courseInput.scourse_description,
    scourse_photo: courseInput.scourse_photo,
    ncategory_id: courseInput.ncategory_id,
    ncreated_by: courseInput.ncreated_by,
  };
  if (isEdit === true) {
    schema.ncourse_id = courseInput.ncourse_id;
    schema.nupdated_by = courseInput.nupdated_by;
  }

  return schema;
}
async function UploadImage(params) {
  const images = await params;
  const promise = images.map(async (image) => {
    const { filename, mimetype, createReadStream } = await image;
    const stream = createReadStream();
  });
}
module.exports = {
  HandleCreateCourse: DBTransact(async (connection, { courseInput }) => {
    const repo = repository(connection);
    const data = await InputValue(courseInput);
    const rec = await UploadImage(courseInput.image);
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
