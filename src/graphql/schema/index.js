const { buildSchema } = require('graphql');
const AdminLogIn = require('../AdminLogIn');
const Category = require('../category');
const Course = require('../course');
const User = require('../user');
const Lesson = require('../lesson');

const schema = `
${AdminLogIn.Schema.Types}
${Category.Schema.Types}
${Course.Schema.Types}
${User.Schema.Types}
${Lesson.Schema.Types}

input FilterStatus{
    status:Int           
}
input SearchKeyword{
    keyword:String           
}

input OrderBy{
    orderKey:Int
    orderType:Int
}

input Pager {
    page: Int!
    maxRecord: Int
}

type PageInfo {
    totalRecords: Int!
    totalPage: Int!
    currentPage: Int!
    totalPerPage: Int
}

type RootQuery {
${AdminLogIn.Schema.RootQuery}    
${Category.Schema.RootQuery}   
${Course.Schema.RootQuery}  
${User.Schema.RootQuery}  
${Lesson.Schema.RootQuery}  
}

type RootMutation {
${AdminLogIn.Schema.RootMutation}   
${Category.Schema.RootMutation}  
${Course.Schema.RootMutation}  
${User.Schema.RootMutation}  
${Lesson.Schema.RootMutation}  
}

scalar Upload

schema {
    query: RootQuery
    mutation: RootMutation
}
`;

module.exports = buildSchema(schema);
