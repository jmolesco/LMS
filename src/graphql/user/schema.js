module.exports = {
  Types: `

        type User{
            nuser_name: String
            nuser_email: String 
            nuser_firstname: String
            nuser_suffixname: String
            nuser_lastname: String
            nuser_middlename: String
            nuser_picture: String
            nuser_password: String
            nuser_group: Int
            nuser_phone1: String
            nuser_phone2: String
            tuser_birthdate: String
            suser_birthplace: String
            saddress_line_1: String
            saddress_line_2: String
            scity: String
            sstate: String
            suser_country: String
            nnationality_id: Int
            nuser_verified: Int
            nuser_gender: Int
            sguardian_lastname: String
            sguardian_middlename: String
            sguardian_firstname: String
            scontact_emergency: String
            slast_school_attended: String
            intime: String  
            uptime: String    
            status: Int
        }

        type UserList{
            list:[User!]!
            pageInfo: PageInfo
          }

        input UserInput {
            nuser_name: String
            nuser_email: String 
            nuser_firstname: String
            nuser_suffixname: String
            nuser_lastname: String
            nuser_middlename: String
            nuser_picture: String
            nuser_password: String
        }
          
        input UserUpdateInput {
            nuser_id:Int!
            nuser_name: String
            nuser_email: String 
            nuser_firstname: String
            nuser_suffixname: String
            nuser_lastname: String
            nuser_middlename: String
            nuser_picture: String
            nuser_password: String
            nuser_group: Int
            nuser_phone1: String
            nuser_phone2: String
            tuser_birthdate: String
            suser_birthplace: String
            saddress_line_1: String
            saddress_line_2: String
            scity: String
            sstate: String
            suser_country: String
            nnationality_id: Int
            nuser_verified: Int
            nuser_gender: Int
            sguardian_lastname: String
            sguardian_middlename: String
            sguardian_firstname: String
            scontact_emergency: String
            slast_school_attended: String
        }

        input UserDeleteInput {
            nUser_id: Int!
        }
        `,
  RootQuery: `GetUserList (pager: Pager): UserList
                GetUserDetail (id: Int!): User
    `,
  RootMutation: `createUser(userInput: UserInput!): Boolean!
                   updateUser(userUpdateInput: UserUpdateInput!): Boolean!
                   deleteUser(userDeleteInput: UserDeleteInput!): Boolean!
                   `,
};
