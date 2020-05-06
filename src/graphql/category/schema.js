module.exports = {
  Types: `

        type Category{
            ncategory_id: Int!
            scategory_name: String   
            intime: String  
            uptime: String    
            status: Int
        }

        type CategoryList{
            list:[Category!]!
            pageInfo: PageInfo
          }

        input CategoryInput {
            scategory_name: String  
        }
          
        input CategoryUpdateInput {
            ncategory_id: Int!
            scategory_name: String 
        }

        input CategoryDeleteInput {
            ncategory_id: Int!
            status:Int
        }

        `,
  RootQuery: `GetCategoryList ( pager: Pager, 
                                filterStatus: FilterStatus,
                                searchKeyword:SearchKeyword
                                orderBy:OrderBy
                               ): CategoryList
                GetCategoryDetail (id: Int!): Category
    `,
  RootMutation: `createCategory(categoryInput: CategoryInput!): Boolean!
                   updateCategory(categoryUpdateInput: CategoryUpdateInput!): Boolean!
                   deleteCategory(categoryDeleteInput: CategoryDeleteInput!): Boolean!
                   `,
};
