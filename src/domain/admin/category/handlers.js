/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const DBTransact = require('@Library/extensions/DBTransaction');

module.exports = {
  HandleCreateCategory: DBTransact(async (connection, { categoryInput }) => {
    const repo = repository(connection);
    const newCategoryStatus = await repo.CategoryRepository.createCategory({
      ncategory_id: categoryInput.ncategory_id,
      scategory_name: categoryInput.scategory_name,
    });
    return newCategoryStatus;
  }),
  HandleUpdateCategory: DBTransact(async (connection, { categoryUpdateInput }) => {
    const repo = repository(connection);
    const newCategoryUpdateStatus = await repo.CategoryRepository.updateCategory({
      ncategory_id: categoryUpdateInput.ncategory_id,
      scategory_name: categoryUpdateInput.scategory_name,
    });
    return newCategoryUpdateStatus;
  }),
  HandleDeleteCategory: DBTransact(async (connection, { categoryDeleteInput }) => {
    const repo = repository(connection);
    const newCategoryDeleteStatus = await repo.CategoryRepository.deleteCategory({
      ncategory_id: categoryDeleteInput.ncategory_id,
      status: 0,
    });
    return newCategoryDeleteStatus;
  }),
};
