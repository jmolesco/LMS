const courseList = `
SELECT course.ncourse_id, course.scourse_title, course.scourse_description, course.scourse_photo, course.ncategory_id, category.scategory_name, course.ncreated_by, course.intime, course.uptime, course.nupdated_by, course.status, CASE WHEN course.uptime is null THEN course.intime WHEN course.uptime > course.intime THEN course.uptime ELSE course.intime END AS OrderDateTime from course INNER JOIN category ON category.ncategory_id = course.ncategory_id 
`;

module.exports = {
  courseList,
};
