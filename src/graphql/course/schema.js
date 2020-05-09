module.exports = {
  Types: `

        type Course{
            ncourse_id: Int!
            scourse_title: String   
            scourse_description: String
            scourse_photo: String
            ncategory_id: Int
            scategory_name: String
            ncreated_by: Int
            nupdated_by: Int
            intime: String  
            uptime: String    
            status: Int
        }

        type CourseList{
            list:[Course!]!
            pageInfo: PageInfo
          }

        input CourseInput {
            scourse_title: String
            scourse_description: String
            scourse_photo: String
            ncategory_id: Int
            ncreated_by: Int
            nupdated_by: Int  
            image:Upload
        }
          
        input CourseUpdateInput {
            ncourse_id: Int!
            scourse_title: String
            scourse_description: String
            scourse_photo: String
            ncategory_id: Int
            ncreated_by: Int
            nupdated_by: Int
            image:Upload  
        }

        input CourseDeleteInput {
            ncourse_id: Int!
            status:Int
        }
        `,
  RootQuery: `GetCourseList (   pager: Pager
                                filterStatus: FilterStatus,
                                searchKeyword:SearchKeyword
                                orderBy:OrderBy
                ): CourseList
                GetCourseDetail (id: Int!): Course
    `,
  RootMutation: `createCourse(courseInput: CourseInput!): Boolean!
                   updateCourse(courseUpdateInput: CourseUpdateInput!): Boolean!
                   deleteCourse(courseDeleteInput: CourseDeleteInput!): Boolean!
                   `,
};
