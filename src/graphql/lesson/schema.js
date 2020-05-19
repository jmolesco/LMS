module.exports = {
  Types: `

        type Lesson{
            id:Int
            title:String
            duration:Int
            course_id:Int
            scourse_title:String
            attachment_type:Int
            attachment:String
            summary:String
            intime:String
            uptime:String
            status:Int
        }

        type LessonList{
            list:[Lesson!]!
            pageInfo: PageInfo
          }

        input LessonInput {
            title:String
            duration:Int
            course_id:Int
            attachment_type:Int
            attachment:String
            summary:String
            file:Upload
        }
          
        input LessonUpdateInput {
            id:Int
            title:String
            duration:Int
            course_id:Int
            attachment_type:Int
            attachment:String
            summary:String
            file:Upload
        }

        input LessonDeleteInput {
            id:Int
            status:Int
        }
        input FilterCourse{
            course_id:Int
        }
        `,
  RootQuery: `GetLessonList ( pager: Pager, 
                                filterStatus: FilterStatus,
                                filterCourse: FilterCourse,
                                searchKeyword:SearchKeyword
                                orderBy:OrderBy
                               ): LessonList
                GetLessonDetail (id: Int!): Lesson
    `,
  RootMutation: `createLesson(lessonInput: LessonInput!): Boolean!
                   updateLesson(lessonUpdateInput: LessonUpdateInput!): Boolean!
                   deleteLesson(lessonDeleteInput: LessonDeleteInput!): Boolean!
                   `,
};
