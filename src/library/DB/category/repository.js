const category = require('./category');
const categoryCriteria = require('./criteria');

function CategoryRepository(connection) {
  const categoryDB = category(connection);

  const inputValue = async (props, isEdit = false) => {
    const schema = {};

    if (isEdit === true) {
      if (props.ncategory_id) {
        schema.ncategory_id = props.ncategory_id;
      }
    }
    if (props.scategory_name) {
      schema.scategory_name = props.scategory_name;
    }

    return schema;
  };
  const createCategory = async (props) => {
    const categoryData = await inputValue(props);
    const result = await categoryDB.create(categoryData);
    return result.affectedRows > 0;
  };

  const updateCategory = async (props) => {
    const criteria = categoryCriteria();
    criteria.IdEqual(props.ncategory_id);
    const categoryData = await inputValue(props, true);
    const result = await categoryDB.update(categoryData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteCategory = async (props) => {
    const criteria = categoryCriteria();
    criteria.IdEqual(props.ncategory_id);
    const categoryData = {};
    categoryData.status = props.status;
    const result = await categoryDB.update(categoryData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  // Search and List
  const findCategoryById = async (id) => {
    try {
      const criteria = categoryCriteria();
      criteria.IdEqual(id);
      const categoryData = await categoryDB.findOne(criteria.getBuildCriteria());
      return categoryData;
    } catch (err) {
      throw err;
    }
  };
  const findCategoryByName = async (props, isEdit = false) => {
    try {
      const criteria = categoryCriteria();
      if (isEdit === true) criteria.notIdEqual(props.ncategory_id);

      criteria.categoryEqual(props.scategory_name);
      const categoryData = await categoryDB.find(criteria.getBuildCriteria());
      return categoryData;
    } catch (err) {
      throw err;
    }
  };
  const getCategoryList = async (crit = categoryCriteria()) => {
    try {
      const categoryData = await categoryDB.find(crit.getBuildCriteria());
      return categoryData;
    } catch (err) {
      throw err;
    }
  };
  const getCategoryDetail = async (id) => {
    try {
      const categoryData = await categoryDB.findById(id, 'ncategory_id');
      return categoryData;
    } catch (err) {
      throw err;
    }
  };
  const getCategoryListCount = async (crit = categoryCriteria()) => {
    try {
      const result = await categoryDB.getCount(crit.getBuildCriteria(), 'ncategory_id');
      return result;
    } catch (err) {
      throw err;
    }
  };
  return {
    createCategory,
    updateCategory,
    deleteCategory,
    findCategoryById,
    findCategoryByName,
    getCategoryList,
    getCategoryListCount,
    getCategoryDetail,
  };
}


module.exports = CategoryRepository;
