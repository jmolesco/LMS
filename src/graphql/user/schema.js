module.exports = {
  Types: `

        type User{
            nuser_id:Int!
            nuser_name: String
            nuser_email: String 
            nuser_firstname: String
            nfull_name: String
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
            nuser_gender: String
            sguardian_lastname: String
            sguardian_middlename: String
            sguardian_firstname: String
            scontact_emergency: String
            slast_school_attended: String
            intime: String  
            uptime: String    
            status: Int
            ndefault_pageview:Int
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
            image:Upload,
            cpass:String,
            ndefault_pageview:Int
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
            ndefault_pageview:Int
            image:Upload
        }

        input UserDeleteInput {
            nuser_id: Int!
            status:Int
        }

        type UserLogIn{
            token:String
            fullName:String
            userName:String
            id:Int
            tokenExpiration:Int
            ndefault_pageview:Int
        }
        input UserLogInParameter{
            nuser_name:String
            nuser_password:String
        }

        input FilterRole{
            role:Int
        }
        `,
  RootQuery: `GetUserList (pager: Pager, 
    filterStatus: FilterStatus,
    searchKeyword: SearchKeyword
    orderBy: OrderBy
    filterRole: FilterRole
    ): UserList
                GetUserDetail (id: Int!): User
    `,
  RootMutation: `  createUser(userInput: UserInput!): Boolean!
                   updateUser(userUpdateInput: UserUpdateInput!): Boolean!
                   deleteUser(userDeleteInput: UserDeleteInput!): Boolean!
                   logInUser(userLogInInput:UserLogInParameter!): UserLogIn
                   `,
};
