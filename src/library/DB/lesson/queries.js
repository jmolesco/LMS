const lessonList = `
SELECT      lesson.id,
            lesson.title,
            lesson.duration,
            lesson.course_id,
            course.scourse_title,
            lesson.attachment_type,
            lesson.attachment,
            lesson.summary,
            lesson.intime,
            lesson.uptime,
            lesson.status,
            CASE
              WHEN lesson.uptime is null
              THEN lesson.intime
              WHEN lesson.uptime > lesson.intime
              THEN lesson.uptime ELSE lesson.intime END AS OrderDateTime
FROM lesson 
INNER JOIN course ON
course.ncourse_id = 
lesson.course_id
`;
const lessonListCount = `
SELECT      
            COUNT(lesson.id) as id,
            CASE
              WHEN lesson.uptime is null
              THEN lesson.intime
              WHEN lesson.uptime > lesson.intime
              THEN lesson.uptime ELSE lesson.intime END AS OrderDateTime
FROM lesson 
INNER JOIN course ON
course.ncourse_id = 
lesson.course_id
`;


module.exports = {
  lessonList,
  lessonListCount,
};
